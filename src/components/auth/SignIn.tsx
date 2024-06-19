// src/SignIn.tsx
import React, { useState } from 'react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';

import { signIn } from '../../rest/api';

const SignIn: React.FC = () => {
	const [ data, setData ] = useState( { email: '', password: '' } );

	const handleSubmit = async( event: React.FormEvent ) => {
		event.preventDefault();
		const res = await signIn( data );
		console.log( res );
	};

	return (
		<div className="container vh-100 d-flex justify-content-center align-items-center">
			<div className="row justify-content-center w-100">
				<div className="col-12 col-md-8 col-lg-4">
					<div className="card p-4">
						<h2 className="text-center mb-4">Sign In</h2>
						<form onSubmit={handleSubmit}>
							<JsonForms
								schema={schema}
								uischema={uischema}
								data={data}
								renderers={materialRenderers}
								cells={materialCells}
								onChange={( { data } ) => setData( data )}
							/>
							<div className="mt-2 mb-3 text-start">
								<a href="#" className="text-decoration-none">Forgot Password?</a>
							</div>
							<div className="mt-2 mb-4">
								<button type="submit" className="btn btn-primary w-100">Sign In</button>
							</div>
							<hr className="my-3" />
							<div className="mt-2 text-center">
								<span>Don't have an account? </span>
								<a href="#" className="text-decoration-none">Sign Up</a>
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

export default SignIn;
