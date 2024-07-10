import React from 'react';
import { useAuth } from '@hooks/UseAuth';
import useJsonForms from '@hooks/UseJsonForms';
import { RESTErrorHandler } from '@utils';

const Profile: React.FC = () => {
	const { user } = useAuth();
	const data = {
		basicInfo: {
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email
			// phoneNumber: ''
		},
		address: {
			street: '',
			city: '',
			district: '',
			zip: ''
		},
		other: {
			// dob: '',
			hasEmergencyContact: false,
			emergencyContact: {
				name: ''
				// phoneNumber: ''
			}
		}
	};
	const { Form, formData, errors, isFormValid } = useJsonForms( { schema, uischema, data } );

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
		<div className="d-flex justify-content-center align-items-center text-start">
			<div className="row justify-content-center w-100">
				<div className="col-12 col-md-8 col-lg-6">
					<div className="p-4">
						<form onSubmit={handleSubmit}>
							{Form}
							<div className="d-flex justify-content-end gap-2 mt-2 mb-4">
								<button type="submit" className="btn btn-primary" disabled={!isFormValid}>Save & Continue</button>
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
				email: { type: 'string', format: 'email', title: 'Email' },
				phoneNumber: { type: 'string', title: 'Phone Number', minLength: 10, maxLength: 10 }
			}
		},
		address: {
			type: 'object',
			properties: {
				street: { type: 'string', title: 'Street' },
				city: { type: 'string', title: 'City' },
				district: { type: 'string', title: 'District' },
				zip: { type: 'string', title: 'Zip Code' }
			}
		},
		other: {
			type: 'object',
			properties: {
				dob: { type: 'string', format: 'date', title: 'Date of Birth' },
				hasEmergencyContact: { type: 'boolean', title: 'Add Emergency Contact' },
				emergencyContact: {
					type: 'object',
					properties: {
						name: { type: 'string', title: 'Contact Name' },
						phoneNumber: { type: 'string', title: 'Contact Phone Number', minLength: 10, maxLength: 10 }
					}
				}
			}
		}
	}
};

const uischema = {
	type: 'VerticalLayout',
	elements: [
		{
			type: 'Group',
			label: 'Basic Info',
			elements: [
				{
					type: 'HorizontalLayout',
					elements: [
						{
							type: 'Control',
							scope: '#/properties/basicInfo/properties/firstName'
						},
						{
							type: 'Control',
							scope: '#/properties/basicInfo/properties/lastName'
						}
					]
				},
				{
					type: 'HorizontalLayout',
					elements: [
						{
							type: 'Control',
							scope: '#/properties/basicInfo/properties/email',
							options: {
								readonly: true
							}
						},
						{
							type: 'Control',
							scope: '#/properties/basicInfo/properties/phoneNumber'
						}
					]
				}
			]
		},
		{
			type: 'Group',
			label: 'Address',
			elements: [
				{
					type: 'HorizontalLayout',
					elements: [
						{
							type: 'Control',
							scope: '#/properties/address/properties/street'
						}
					]
				},
				{
					type: 'HorizontalLayout',
					elements: [
						{
							type: 'Control',
							scope: '#/properties/address/properties/city'
						},
						{
							type: 'Control',
							scope: '#/properties/address/properties/district'
						},
						{
							type: 'Control',
							scope: '#/properties/address/properties/zip'
						}
					]
				}
			]
		},
		{
			type: 'Group',
			label: 'Other',
			elements: [
				{
					type: 'Control',
					scope: '#/properties/other/properties/dob',
					options: {
						styles: {
							width: '50%'
						}
					}
				},
				{
					type: 'Control',
					scope: '#/properties/other/properties/hasEmergencyContact'
				},
				{
					type: 'HorizontalLayout',
					rule: {
						effect: 'HIDE',
						condition: {
							scope: '#/properties/other/properties/hasEmergencyContact',
							schema: { const: false }
						}
					},
					elements: [
						{
							type: 'Control',
							scope: '#/properties/other/properties/emergencyContact/properties/name'
						},
						{
							type: 'Control',
							scope: '#/properties/other/properties/emergencyContact/properties/phoneNumber'
						}
					]
				}
			]
		}
	]
};

export { Profile };

