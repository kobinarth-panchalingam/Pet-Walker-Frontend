import axios from 'axios';

const client = axios.create( {
	baseURL: import.meta.env.VITE_REST_API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
} );

export default client;