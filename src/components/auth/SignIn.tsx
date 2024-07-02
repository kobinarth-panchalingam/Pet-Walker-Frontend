import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signIn } from '@api';
import { HOME, SIGN_UP } from '@constants/routes';
import { useAuth } from '@contexts/AuthContext';
import { SignInData } from '@types';
import { RESTErrorHandler } from '@utils';

import { CustomJsonForms } from '../common/CustomJsonForms';

const SignIn: React.FC = () => {
	const [ data, setData ] = useState<SignInData>( { email: '', password: '' } );
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async( event: React.FormEvent ) => {
		event.preventDefault();
		try {
			const res = await signIn( data );
			login( res.data.token );
			navigate( HOME );
		} catch ( error ) {
			RESTErrorHandler( error );
		}
	};

	return (
		<div className="vh-100 d-flex justify-content-center align-items-center">
			<div className="row justify-content-center w-100">
				<div className="col-12 col-md-8 col-lg-4">
					<div className="card p-4">
						<h2 className="text-center mb-4">Sign In</h2>
						<form onSubmit={handleSubmit}>
							<CustomJsonForms
								schema={schema}
								uischema={uischema}
								data={data}
								onChange={( { data } ) => setData( data )}
							/>
							<div className="mt-2 mb-3 text-start">
								<a href="#" className="text-decoration-none">Forgot Password?</a>
							</div>
							<div className="mt-2 mb-4">
								<button type="submit" className="btn btn-primary w-100">Sign In</button>
							</div>
							<hr className="my-3" />
							<div className="mt-2">
								<span>Don't have an account? </span>
								<NavLink to={SIGN_UP} className="text-decoration-none">Sign Up</NavLink>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

const schema = {
	type: 'object',
	properties: {
		email: {
			type: 'string',
			format: 'email',
			title: 'Email'
		},
		password: {
			type: 'string',
			title: 'Password'
		}
	},
	required: [ 'email', 'password' ]
};

const uischema = {
	type: 'VerticalLayout',
	elements: [
		{
			type: 'Control',
			scope: '#/properties/email'
		},
		{
			type: 'Control',
			scope: '#/properties/password',
			options: {
				format: 'password'
			}
		}
	]
};

export { SignIn };

