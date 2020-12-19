import axios from 'axios';

let baseURL = 'http://localhost:5000/api';
if (process.env.NODE_ENV === 'production') {
	baseURL = 'http://shoutout-by-princh.herokuapp.com/api';
}

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true,
});

export default axiosInstance;
