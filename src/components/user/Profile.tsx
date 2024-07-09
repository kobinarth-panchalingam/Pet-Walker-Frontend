import React, { useState } from 'react';
import { useAuth } from '@hooks/UseAuth';
import useJsonForms from '@hooks/UseJsonForms';
import { RESTErrorHandler } from '@utils';


const Profile: React.FC = () => {
	const [ editMode, setEditMode ] = useState( false );
	const { user } = useAuth();
	const data = {
		basicInfo: {
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email
		}
	};
	const { Form, formData, errors, isFormValid } = useJsonForms( { schema, uischema, data, readonly: !editMode } );

	const handleSubmit = async( event: React.FormEvent ) => {
		event.preventDefault();
		try {
			console.log( formData );
			console.log( errors );
		} catch ( error ) {
			RESTErrorHandler( error );
		}
	};

	return (
		<div className="container vh-100 d-flex justify-content-center align-items-center">
			<div className="row justify-content-center w-100">
				<div className="col-12 col-md-8 col-lg-6">
					<div className="card p-4">
						<form onSubmit={handleSubmit}>
							{Form}
							<div className="d-flex justify-content-end gap-2 mt-2 mb-4"> {/* Adjusted for alignment and spacing */}
								{editMode ?
									<>
										<button
											type="button"
											className="btn btn-secondary"
											onClick={() => setEditMode( false )}
										>
									Cancel
										</button>
										<button type="submit" className="btn btn-primary" disabled={!isFormValid}>Save</button>
									</> :
									<button
										type="button"
										className="btn btn-primary"
										onClick={() => setEditMode( true )}
									>
									Edit
									</button>}
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
		basicInfo: {
			type: 'object',
			properties: {
				firstName: { type: 'string', title: 'First Name' },
				lastName: { type: 'string', title: 'Last Name' },
				email: { type: 'string', format: 'email', title: 'Email' }
			}
		},
		address: {
			type: 'object',
			properties: {
				street: { type: 'string', title: 'Street' },
				city: { type: 'string', title: 'City' },
				state: { type: 'string', title: 'State' },
				zip: { type: 'string', title: 'Zip Code' }
			}
		},
		other: {
			type: 'object',
			properties: {
				bio: { type: 'string', title: 'Bio' },
				website: { type: 'string', title: 'Website' }
			}
		}
	}
};

const uischema = {
	type: 'Categorization',
	elements: [
		{
			type: 'Category',
			label: 'Basic Info',
			elements: [
				{
					type: 'Control',
					scope: '#/properties/basicInfo/properties/firstName'
				},
				{
					type: 'Control',
					scope: '#/properties/basicInfo/properties/lastName'
				},
				{
					type: 'Control',
					scope: '#/properties/basicInfo/properties/email'
				}
			]
		},
		{
			type: 'Category',
			label: 'Address',
			elements: [
				{
					type: 'Control',
					scope: '#/properties/address/properties/street'
				},
				{
					type: 'Control',
					scope: '#/properties/address/properties/city'
				},
				{
					type: 'Control',
					scope: '#/properties/address/properties/state'
				},
				{
					type: 'Control',
					scope: '#/properties/address/properties/zip'
				}
			]
		},
		{
			type: 'Category',
			label: 'Other',
			elements: [
				{
					type: 'Control',
					scope: '#/properties/other/properties/bio'
				},
				{
					type: 'Control',
					scope: '#/properties/other/properties/website'
				}
			]
		}
	]
};

export { Profile };

