import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signUp } from '@api';
import { HOME, SIGN_IN } from '@constants/routes';
import { useAuth } from '@hooks/UseAuth';
import { SignUpData } from '@types';
import { RESTErrorHandler } from '@utils';

import CustomJsonForms from '../jsonforms/CustomJsonForms';

const SignUp: React.FC = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [ formData, setFormData ] = useState( data );
	const [ isFormValid, setIsFormValid ] = useState( true );

	const onChange = ( { data, errors }:any ) => {
		setFormData( data );
		setIsFormValid( errors.length === 0 );
	};

	const handleSubmit = async( event: React.FormEvent ) => {
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
		<div className="d-flex justify-content-center row w-100 text-center">
			<div className="card p-4 p-0 col-12 col-md-8 col-lg-6">
				<h2 className="mb-4">Sign Up</h2>
				<form onSubmit={handleSubmit}>
					<CustomJsonForms schema={schema} uischema={uischema} data={formData} onChange={onChange} />
					<div className="mt-2 mb-4">
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

