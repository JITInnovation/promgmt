import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/timesheets';

const getTimesheets = (userId, weekStartDate) => {
    return axios.get(API_URL, {
        headers: authHeader(),
        params: {
            userId,
            weekStartDate
        }
    });
};

const saveAllTimesheets = (timesheets) => {
    return axios.post(API_URL + '/saveAll', timesheets, { headers: authHeader() });
};

const TimesheetService = {
    getTimesheets,
    saveAllTimesheets
};

export default TimesheetService;
