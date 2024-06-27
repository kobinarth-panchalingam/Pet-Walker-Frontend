import { toast } from 'react-toastify';
import axios from 'axios';

const axiosClient = axios.create( {
	baseURL: import.meta.env.VITE_REST_API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
} );

const RESTErrorHandler = ( error: any ) => {
	let errorMessage = 'An error occurred';
	if ( error.response ) {
		const { status, data } = error.response;

		switch ( status ) {
			case 400 :
				errorMessage = 'Bad request';
				break;
			case 401 :
				errorMessage = 'Unauthorized';
				break;
			case 403 :
				errorMessage = 'Forbidden';
				break;
			case 404 :
				errorMessage = 'Not found';
				break;
			case 500 :
				errorMessage = 'Internal server error';
				break;
			default :
				errorMessage = 'An error occurred';
		}

		// If the response includes a message, append it to the error message
		if ( data && data.error ) {
			errorMessage += `: ${data.error}`;
		}
	} else if ( error.request ) {
		errorMessage = 'No response received from the server';
	} else {
		errorMessage = `Error: ${error.message}`;
	}
	toast.error( errorMessage );
};

export { axiosClient, RESTErrorHandler };