import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

const getPublicContent = () => {
  return axios.get(API_URL + 'all');
};

const getDeveloperBoard = () => {
  return axios.get(API_URL + 'dev', { headers: authHeader() });
};

const getProjectManagerBoard = () => {
  return axios.get(API_URL + 'pm', { headers: authHeader() });
};

const getSeniorManagementBoard = () => {
  return axios.get(API_URL + 'admin', { headers: authHeader() });
};

const UserService = {
    getPublicContent,
    getDeveloperBoard,
    getProjectManagerBoard,
    getSeniorManagementBoard
}

export default UserService;
