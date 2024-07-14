import { CircularProgress } from '@mui/material';

const LoadingIndicator = ( { size = 40, thickness = 4, ...props } ) => {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
			<CircularProgress size={size} thickness={thickness} {...props} />
		</div>
	);
};

export default LoadingIndicator;
