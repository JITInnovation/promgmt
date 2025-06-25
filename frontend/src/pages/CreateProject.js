import React, { useState } from "react";
import ProjectService from "../services/project.service";

const CreateProject = () => {
    const [projectName, setProjectName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [programmersRequired, setProgrammersRequired] = useState(0);
    const [testersRequired, setTestersRequired] = useState(0);
    const [projectLeadsRequired, setProjectLeadsRequired] = useState(0);
    const [releaseQuarter, setReleaseQuarter] = useState("Q1");
    const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const handleCreateProject = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        const projectData = {
            projectName,
            startDate,
            endDate,
            programmersRequired,
            testersRequired,
            projectLeadsRequired,
            releaseQuarter,
            releaseYear
        };

        ProjectService.createProject(projectData).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <form onSubmit={handleCreateProject}>
                    <div>
                        <div className="form-group">
                            <label htmlFor="projectName">Project Name</label>
                            <input type="text" className="form-control" name="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="startDate">Start Date</label>
                            <input type="date" className="form-control" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <input type="date" className="form-control" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="programmersRequired">Programmers Required</label>
                            <input type="number" className="form-control" name="programmersRequired" value={programmersRequired} onChange={(e) => setProgrammersRequired(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="testersRequired">Testers Required</label>
                            <input type="number" className="form-control" name="testersRequired" value={testersRequired} onChange={(e) => setTestersRequired(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="projectLeadsRequired">Project Leads Required</label>
                            <input type="number" className="form-control" name="projectLeadsRequired" value={projectLeadsRequired} onChange={(e) => setProjectLeadsRequired(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="releaseQuarter">Release Quarter</label>
                            <select name="releaseQuarter" className="form-control" value={releaseQuarter} onChange={(e) => setReleaseQuarter(e.target.value)}>
                                <option value="Q1">Q1</option>
                                <option value="Q2">Q2</option>
                                <option value="Q3">Q3</option>
                                <option value="Q4">Q4</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="releaseYear">Release Year</label>
                            <input type="number" className="form-control" name="releaseYear" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Create Project</button>
                        </div>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
