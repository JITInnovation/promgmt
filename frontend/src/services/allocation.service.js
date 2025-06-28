import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/allocations/';

const createAllocation = (userId, projectId, assignmentDate, endDate, percentage) => {
  return axios.post(API_URL + 'create', {
    userId,
    projectId,
    assignmentDate,
    endDate,
    percentage
  }, { headers: authHeader() });
};

const getAssignableUsers = () => {
  return axios.get(API_URL + 'resources', { headers: authHeader() });
};

const getProjectAllocations = (projectId) => {
    return axios.get(API_URL + `project/${projectId}`, { headers: authHeader() });
};

const getUserAllocations = (userId) => {
    return axios.get(API_URL + `user/${userId}`, { headers: authHeader() });
};

const AllocationService = {
    createAllocation,
    getAssignableUsers,
    getProjectAllocations,
    getUserAllocations
}

export default AllocationService;
