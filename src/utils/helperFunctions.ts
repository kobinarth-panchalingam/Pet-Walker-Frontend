
import { User } from '@types';
import { jwtDecode } from 'jwt-decode';

const parseToken = ( token: string ): User | null => {
	try {
		const decoded: any = jwtDecode( token );
		const user: User = {
			id: decoded.id,
			email: decoded.email,
			firstName: decoded.firstName,
			lastName: decoded.lastName,
			role: decoded.role
		};
		return user;
	} catch ( error ) {
		console.error( 'Error decoding JWT token:', error );
		return null;
	}
};

export { parseToken };