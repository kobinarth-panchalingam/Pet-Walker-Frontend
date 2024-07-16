import { CircularProgress } from '@mui/material';

const LoadingIndicator = ( { size = 40, thickness = 4, ...props } ) => {
	return (
		<div className='d-flex justify-content-center align-items-center vw-100'>
			<CircularProgress size={size} thickness={thickness} {...props} />
		</div>
	);
};

export { LoadingIndicator };
