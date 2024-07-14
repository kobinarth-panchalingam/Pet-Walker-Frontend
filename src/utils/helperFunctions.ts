
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

const formatDateOnly = ( dateString: string ) => {
	return dateString.split( 'T' )[0];
};

type ComparableObject = {
	[key: string]: any;
  };

const getChangedFields = ( initial: ComparableObject, current: ComparableObject ): ComparableObject => {
	const changedFields: ComparableObject = {};
	for ( const key in current ) {
		if ( typeof current[key] === 'object' && !Array.isArray( current[key] ) && current[key] !== null ) {
			const nestedChanges = getChangedFields( initial[key] || {}, current[key] );
			if ( Object.keys( nestedChanges ).length > 0 ) {
				changedFields[key] = nestedChanges;
			}
		} else if ( current[key] !== initial[key] ) {
			changedFields[key] = current[key];
		}
	}
	return changedFields;
};


export { parseToken, formatDateOnly, getChangedFields };