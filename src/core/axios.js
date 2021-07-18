import axios from 'axios';

axios.defaults.baseURL = 'https://third-team-forms.herokuapp.com';
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;

axios.default.updateToken = (token) => {
	localStorage.token = token;
	axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
};

export default axios;
