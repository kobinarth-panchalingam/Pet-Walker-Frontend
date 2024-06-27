import { SIGN_IN, SIGN_UP } from '@constants/restEndPoints';
import { SignInData, SignUpData } from '@types';
import { axiosClient } from '@utils';

export const signIn = ( { email, password }: SignInData ) => {
	return axiosClient.post( SIGN_IN, { email, password } );
};

export const signUp = (  { email, password, firstName, lastName, role }: SignUpData ) => {
	return axiosClient.post( SIGN_UP, { email, password, firstName, lastName, role } );
};