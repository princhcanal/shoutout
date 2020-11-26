import axios from 'axios';

const axiosInstance = axios.create({
	// baseURL: `http://localhost:5000`,
	baseURL: 'http://shoutout-by-princh.herokuapp.com',
	withCredentials: true,
});

export default axiosInstance;
