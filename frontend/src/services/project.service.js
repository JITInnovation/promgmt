import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/projects';

const createProject = (projectData) => {
  return axios.post(API_URL + '/create', projectData, { headers: authHeader() });
};

const getProjects = (page, size) => {
  return axios.get(API_URL + `?page=${page}&size=${size}`, { headers: authHeader() });
};

const getProject = (id) => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

const getAllProjects = () => {
  return axios.get(API_URL + '/all', { headers: authHeader() });
};

const ProjectService = {
    createProject,
    getProjects,
    getProject,
    getAllProjects
}

export default ProjectService;
