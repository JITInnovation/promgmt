import React, { useState, useEffect } from 'react';
import ProjectService from '../services/project.service';
import AllocationService from '../services/allocation.service';

const ResourceAllocation = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [assignableUsers, setAssignableUsers] = useState([]);
    const [projectAllocations, setProjectAllocations] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [assignmentDate, setAssignmentDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [percentage, setPercentage] = useState(100);
    const [message, setMessage] = useState('');

    useEffect(() => {
        ProjectService.getProjects(0, 100).then(response => {
            setProjects(response.data.content);
        });
    }, []);

    useEffect(() => {
        if (selectedProject) {
            AllocationService.getAssignableUsers().then(response => {
                setAssignableUsers(response.data);
            });
            AllocationService.getProjectAllocations(selectedProject.id).then(response => {
                setProjectAllocations(response.data);
            });
        }
    }, [selectedProject]);

    const handleAllocationSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        AllocationService.createAllocation(selectedUser, selectedProject.id, assignmentDate, endDate, percentage)
            .then(response => {
                setMessage(response.data.message);
                // Refresh allocations
                AllocationService.getProjectAllocations(selectedProject.id).then(response => {
                    setProjectAllocations(response.data);
                });
            }, error => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            });
    };

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>Resource Allocation</h3>
            </header>

            <div className="form-group">
                <label htmlFor="project">Select Project</label>
                <select name="project" className="form-control" onChange={(e) => setSelectedProject(projects.find(p => p.id === e.target.value))}>
                    <option value="">-- Select a Project --</option>
                    {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.projectName}</option>
                    ))}
                </select>
            </div>

            {selectedProject && (
                <div>
                    <h4>Allocate Resource for {selectedProject.projectName}</h4>
                    <form onSubmit={handleAllocationSubmit}>
                        <div className="form-group">
                            <label htmlFor="user">Select User</label>
                            <select name="user" className="form-control" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
                                <option value="">-- Select a User --</option>
                                {assignableUsers.map(u => (
                                    <option key={u.id} value={u.id}>{u.username} ({u.function})</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="assignmentDate">Assignment Date</label>
                            <input type="date" className="form-control" value={assignmentDate} onChange={(e) => setAssignmentDate(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="percentage">Allocation (%)</label>
                            <input type="number" min="1" max="100" className="form-control" value={percentage} onChange={(e) => setPercentage(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Allocate</button>
                    </form>

                    {message && <div className="alert alert-info mt-2">{message}</div>}

                    <h4 className="mt-4">Current Allocations for {selectedProject.projectName}</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Function</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Allocation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectAllocations.map(alloc => (
                                <tr key={alloc.id}>
                                    <td>{alloc.user.username}</td>
                                    <td>{alloc.user.function}</td>
                                    <td>{new Date(alloc.assignmentDate).toLocaleDateString()}</td>
                                    <td>{new Date(alloc.endDate).toLocaleDateString()}</td>
                                    <td>{alloc.percentage}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ResourceAllocation;
