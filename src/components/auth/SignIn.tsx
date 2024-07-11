import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signIn } from '@api';
import { HOME, SIGN_UP } from '@constants/routes';
import { useAuth } from '@hooks/UseAuth';
import useJsonForms from '@hooks/UseJsonForms';
import { SignInData } from '@types';
import { RESTErrorHandler } from '@utils';

const SignIn: React.FC = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const { Form, formData, isFormValid } = useJsonForms( { schema, uischema, data } );

	const handleSubmit = async( event: React.FormEvent ) => {
		event.preventDefault();
		try {
			const res = await signIn( formData );
			login( res.data.token );
			navigate( HOME );
		} catch ( error ) {
			RESTErrorHandler( error );
		}
	};

	return (
		<div className="d-flex justify-content-center row w-100">
			<div className="card p-4 p-0 col-12 col-md-8 col-lg-6">
				<h2 className="text-center mb-4">Sign In</h2>
				<form onSubmit={handleSubmit}>
					{Form}
					<div className="mt-2 mb-3 text-start">
						<a href="#" className="text-decoration-none">Forgot Password?</a>
					</div>
					<div className="mt-2 mb-4">
						<button type="submit" className="btn btn-primary w-100" disabled={!isFormValid}>Sign In</button>
					</div>
					<hr className="my-3" />
					<div className="mt-2">
						<span>Don't have an account? </span>
						<NavLink to={SIGN_UP} className="text-decoration-none">Sign Up</NavLink>
					</div>
				</form>
			</div>
		</div>
	);
};

const data: SignInData = {
	email: '',
	password: ''
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
			title: 'Password',
			minLength: 3 //todo: change to 8
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

