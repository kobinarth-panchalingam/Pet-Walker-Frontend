import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface ErrorComponentProps {
	error: any;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ( { error } ) => {
	return (
		<Alert severity="error">
			<AlertTitle>Error</AlertTitle>
			{error.message}
		</Alert>
	);
};

export default ErrorComponent;
