import React, { useState, useEffect } from 'react';
import TimesheetService from '../services/timesheet.service';
import ProjectService from '../services/project.service';
import AuthService from '../services/auth.service';

const getMonday = (d) => {
    d = new Date(d);
    const day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    d.setHours(0, 0, 0, 0);
    return new Date(d.setDate(diff));
};

const Timesheet = () => {
    const [timesheets, setTimesheets] = useState([]);
    const [projects, setProjects] = useState([]);
    const [weekStartDate, setWeekStartDate] = useState(getMonday(new Date()));
    const [selectedActivity, setSelectedActivity] = useState('PERSONAL_LEAVE');

    const activityTypes = {
        PERSONAL_LEAVE: 'Personal Leave',
        SICK_LEAVE: 'Sick Leave',
        HOLIDAY: 'Holiday',
        TRAINING: 'Training',
    };

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        ProjectService.getAllProjects().then(response => setProjects(response.data));
        TimesheetService.getTimesheets(currentUser.id, weekStartDate.toISOString().split('T')[0]).then(response => {
            setTimesheets(response.data);
        });
    }, [weekStartDate]);

    const handleWeekStartDateChange = (e) => {
        const selectedDate = new Date(e.target.value + 'T00:00:00');
        setWeekStartDate(getMonday(selectedDate));
    };

    const handleAddRow = () => {
        setTimesheets([...timesheets, { projectId: '', hours: {} }]);
    };

    const handleAddActivity = () => {
        if (timesheets.some(ts => ts.projectId === selectedActivity)) {
            alert(`'${activityTypes[selectedActivity]}' has already been added for this week.`);
            return;
        }
        setTimesheets([...timesheets, { projectId: selectedActivity, hours: {} }]);
    };

    const handleRemoveRow = (index) => {
        const updatedTimesheets = [...timesheets];
        updatedTimesheets.splice(index, 1);
        setTimesheets(updatedTimesheets);
    };

    const handleInputChange = (index, day, value) => {
        const updatedTimesheets = [...timesheets];
        updatedTimesheets[index].hours[day] = parseInt(value, 10) || 0;
        setTimesheets(updatedTimesheets);
    };

    const handleProjectChange = (index, projectId) => {
        const updatedTimesheets = [...timesheets];
        updatedTimesheets[index].projectId = projectId;
        setTimesheets(updatedTimesheets);
    };

    const handleSaveAll = () => {
        const currentUser = AuthService.getCurrentUser();
        const timesheetsToSave = timesheets.map(ts => ({
            ...ts,
            userId: currentUser.id,
            weekStartDate: weekStartDate.toISOString().split('T')[0],
        }));

        TimesheetService.saveAllTimesheets(timesheetsToSave)
            .then(response => {
                alert('Timesheets saved successfully!');
            })
            .catch(error => {
                console.error('There was an error saving the timesheets:', error);
                alert('Failed to save timesheets.');
            });
    };

    const calculateTotalHours = (hours) => {
        return Object.values(hours).reduce((acc, curr) => acc + (parseInt(curr, 10) || 0), 0);
    };

    const dayHeaders = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(weekStartDate);
        date.setDate(date.getDate() + i);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
        const dateNum = date.getDate();
        return { day, dateNum };
    });

    const grandTotal = timesheets.reduce((total, ts) => total + calculateTotalHours(ts.hours), 0);

    return (
        <div className="container mt-4">
            <h3>Timesheet</h3>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <label htmlFor="week-start-date" className="me-2">Week Start:</label>
                    <input id="week-start-date" type="date" className="form-control d-inline-block" style={{ width: 'auto' }} value={weekStartDate.toISOString().split('T')[0]} onChange={handleWeekStartDateChange} />
                </div>
                <div>
                    <button className="btn btn-primary me-2" onClick={handleAddRow}>Add Project</button>
                    <select className="form-select d-inline-block me-2" style={{ width: 'auto' }} value={selectedActivity} onChange={e => setSelectedActivity(e.target.value)}>
                        {Object.entries(activityTypes).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                    <button className="btn btn-info" onClick={handleAddActivity}>Add Activity</button>
                </div>
            </div>
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th style={{width: '25%', verticalAlign: 'middle'}}>Project / Activity</th>
                        {dayHeaders.map(({ day, dateNum }) => (
                            <th key={day} className="text-center">
                                <div>{day}</div>
                                <div>{dateNum}</div>
                            </th>
                        ))}
                        <th className="text-center" style={{verticalAlign: 'middle'}}>Total</th>
                        <th className="text-center" style={{verticalAlign: 'middle'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {timesheets.map((ts, index) => {
                        const totalHours = calculateTotalHours(ts.hours);
                        const isActivity = Object.keys(activityTypes).includes(ts.projectId);
                        return (
                            <tr key={index}>
                                <td>
                                    {isActivity ? (
                                        <span>{activityTypes[ts.projectId]}</span>
                                    ) : (
                                        <select className="form-select" value={ts.projectId} onChange={e => handleProjectChange(index, e.target.value)}>
                                            <option value="">Select Project</option>
                                            {projects.map(p => <option key={p.id} value={p.id}>{p.projectName}</option>)}
                                        </select>
                                    )}
                                </td>
                                {dayHeaders.map(({ day }) => (
                                    <td key={day} style={{ backgroundColor: (day === 'SAT' || day === 'SUN') ? '#f8f9fa' : 'white' }}>
                                        <input 
                                            type="number" 
                                            className="form-control"
                                            style={{ maxWidth: '75px', textAlign: 'center' }}
                                            value={ts.hours[day] || ''} 
                                            onChange={e => handleInputChange(index, day, e.target.value)} 
                                            min="0"
                                        />
                                    </td>
                                ))}
                                <td className="text-center align-middle"><strong>{totalHours}</strong></td>
                                <td className="text-center align-middle">
                                    <button className="btn btn-sm btn-danger" onClick={() => handleRemoveRow(index)}>Remove</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={dayHeaders.length + 1} className="text-end"><strong>Grand Total</strong></td>
                        <td className="text-center" style={{ color: grandTotal > 40 ? 'red' : 'green' }}>
                            <strong>{grandTotal}</strong>
                        </td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <div className="text-end mt-3">
                <button className="btn btn-success" onClick={handleSaveAll}>Submit</button>
            </div>
        </div>
    );
};

export default Timesheet;
