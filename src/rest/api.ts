import client from '../utils/axios';
interface SignInData {
    email: string;
    password: string;
}

export const signIn = async( { email, password }: SignInData ) => {
	try {
		const { data } = await client.post( '/auth/login', { email, password } );
		return data;
	} catch ( error ) {
		console.log( error );
	}
};