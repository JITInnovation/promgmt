import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectService from '../services/project.service';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        ProjectService.getProject(id)
            .then(response => {
                setProject(response.data);
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
    }, [id]);

    if (loading) {
        return <p>Loading project details...</p>;
    }

    if (message) {
        return <div className="alert alert-danger">{message}</div>;
    }

    if (!project) {
        return <p>Project not found.</p>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{project.projectName}</h3>
            </header>
            <p><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}</p>
            <p><strong>Programmers Required:</strong> {project.programmersRequired}</p>
            <p><strong>Testers Required:</strong> {project.testersRequired}</p>
            <p><strong>Project Leads Required:</strong> {project.projectLeadsRequired}</p>
            <p><strong>Release:</strong> {project.releaseQuarter} {project.releaseYear}</p>
        </div>
    );
};

export default ProjectDetails;
