import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signUp } from '@api';
import { HOME, SIGN_IN } from '@constants/routes';
import { useAuth } from '@hooks/UseAuth';
import useJsonForms from '@hooks/UseJsonForms';
import { SignUpData } from '@types';
import { RESTErrorHandler } from '@utils';

const SignUp: React.FC = () => {
	const { Form, formData, errors, isFormValid } = useJsonForms( { schema, uischema, data } );
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async( event: React.FormEvent ) => {
		console.log( errors );
		console.log( formData );
		event.preventDefault();
		try {
			const res = await signUp( formData );
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
						<h2 className="text-center mb-4">Sign Up</h2>
						<form onSubmit={handleSubmit}>
							{Form}
							<div className="mt-2 mb-4   ">
								<button type="submit" className="btn btn-primary w-100" disabled={!isFormValid}>Sign Up</button>
							</div>
							<hr className="my-3" />
							<div className="mt-2">
								<span>Already have an account? </span>
								<NavLink to={SIGN_IN} className="text-decoration-none">Sign In</NavLink>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

const data: SignUpData = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	role: 'OWNER'
};

const schema = {
	type: 'object',
	properties: {
		firstName: { type: 'string', title: 'First Name', minLength: 1 },
		lastName: { type: 'string', title: 'Last Name' },
		email: { type: 'string', format: 'email', title: 'Email' },
		password: { type: 'string', title: 'Password', minLength: 8 }
	},
	required: [ 'firstName', 'lastName', 'email', 'password' ]
};

const uischema = {
	type: 'VerticalLayout',
	elements: [
		{ type: 'Control', scope: '#/properties/firstName' },
		{ type: 'Control', scope: '#/properties/lastName' },
		{ type: 'Control', scope: '#/properties/email' },
		{ type: 'Control', scope: '#/properties/password', options: { format: 'password' } }
	]
};

export { SignUp };

