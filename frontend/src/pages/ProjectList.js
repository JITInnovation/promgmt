import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectService from '../services/project.service';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProjects(currentPage);
    }, [currentPage]);

    const fetchProjects = (page) => {
        setLoading(true);
        ProjectService.getProjects(page, 10)
            .then(response => {
                setProjects(response.data.content);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            })
            .catch(error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setLoading(false);
            });
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>Projects</h3>
            </header>
            {loading && <p>Loading...</p>}
            {message && <div className="alert alert-danger">{message}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Release Quarter</th>
                        <th>Release Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <td>{project.projectName}</td>
                            <td>{new Date(project.startDate).toLocaleDateString()}</td>
                            <td>{new Date(project.endDate).toLocaleDateString()}</td>
                            <td>{project.releaseQuarter}</td>
                            <td>{project.releaseYear}</td>
                            <td>
                                <Link to={`/projects/${project.id}`} className="btn btn-info btn-sm">
                                    Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary mr-2" onClick={handlePrevious} disabled={currentPage === 0}>
                    Previous
                </button>
                <span>Page {currentPage + 1} of {totalPages}</span>
                <button className="btn btn-primary ml-2" onClick={handleNext} disabled={currentPage >= totalPages - 1}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProjectList;
