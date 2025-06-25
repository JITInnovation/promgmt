import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/admin/';

const createUser = (username, email, password, role, firstName, lastName, userFunction, phone) => {
  return axios.post(API_URL + 'createuser', {
    username,
    email,
    password,
    role,
    firstName,
    lastName,
    function: userFunction,
    phone
  }, { headers: authHeader() });
};

const AdminService = {
    createUser
}

export default AdminService;
