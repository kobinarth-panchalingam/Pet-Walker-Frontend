import React, { useEffect, useState } from 'react';
// import { fetchUserProfile, updateUserProfile } from '@api'; // These are placeholder API calls
import { RESTErrorHandler } from '@utils';

import { CustomJsonForms } from '../common/CustomJsonForms';

const Profile: React.FC = () => {
	// const { user, login } = useAuth();
	const [ data, setData ] = useState( null );
	const [ isEditing, setIsEditing ] = useState( false );

	useEffect( () => {
		// Fetch user profile data when component mounts
		const fetchData = async() => {
			try {
				// const response = await fetchUserProfile();
				// setData( response.data );
			} catch ( error ) {
				RESTErrorHandler( error );
			}
		};
		fetchData();
	}, [] );

	const handleSubmit = async( event: React.FormEvent ) => {
		event.preventDefault();
		try {
			// const response = await updateUserProfile( data );
			// login( response.data.token ); // Update token if necessary
			setIsEditing( false );
		} catch ( error ) {
			RESTErrorHandler( error );
		}
	};

	if ( data ) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container vh-100 d-flex justify-content-center align-items-center">
			<div className="row justify-content-center w-100">
				<div className="col-12 col-md-8 col-lg-6">
					<div className="card p-4">
						{isEditing ?
							<form onSubmit={handleSubmit}>
								<CustomJsonForms
									schema={schema}
									uischema={uischema}
									data={data}
									onChange={( { data } ) => setData( data )}
								/>
								<div className="d-flex justify-content-end gap-2 mt-2 mb-4"> {/* Adjusted for alignment and spacing */}
									<button
										type="button"
										className="btn btn-secondary"
										onClick={() => setIsEditing( false )}
									>
									Cancel
									</button>
									<button type="submit" className="btn btn-primary">Save</button>
								</div>
							</form>
							:
							<div>
								<pre>{JSON.stringify( data, null, 2 )}</pre>
								<button
									type="button"
									className="btn btn-primary w-100 mt-4"
									onClick={() => setIsEditing( true )}
								>
                                    Edit Profile
								</button>
							</div>
						}
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

