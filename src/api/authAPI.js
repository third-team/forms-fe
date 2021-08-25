import { axios } from 'core';

export default {
	auth: (authType, email, password) => axios.post(`/${authType}`, { email, password }),
};
