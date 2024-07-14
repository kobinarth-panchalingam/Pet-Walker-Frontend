import React from 'react';
import { GET_USER, UPDATE_USER } from '@api';
import { useMutation, useQuery } from '@apollo/client';
import { formatDateOnly, RESTErrorHandler } from '@utils';
import { UpdateUserMutationVariables } from 'src/api/graphql/__generated__/graphql';

import profile from '../../assets/images/profile.png';
import ErrorComponent from '../common/ErrorComponent';
import { Form } from '../common/Form';
import LoadingIndicator from '../common/LoadingIndicator';

const Profile: React.FC = () => {
	const { data, loading: getUserLoading, error } = useQuery( GET_USER );
	const user = data?.getUser;
	const initialFormData = {
		basicInfo: {
			firstName: user?.firstName,
			lastName: user?.lastName || undefined,
			phoneNumber: user?.phoneNumber || undefined,
			dob: user?.dob ? formatDateOnly( user?.dob ) : undefined,
			email: user?.email,
			profilePhoto: user?.profilePhoto || profile
		},
		address: {
			street: user?.street || undefined,
			city: user?.city || undefined,
			district: user?.district || undefined,
			zipCode: user?.zipCode || undefined
		},
		other: {
			emergencyContacts: user?.emergencyContacts || []
		}
	};

	const [ updateUser, { loading: updateUserLoading } ] = useMutation( UPDATE_USER );

	const handleSubmit = async( formData:any ) => {
		const variables: UpdateUserMutationVariables = {
			input: {
				firstName: formData.basicInfo.firstName,
				lastName: formData.basicInfo.lastName,
				phoneNumber: formData.basicInfo.phoneNumber,
				dob: formData.basicInfo.dob,
				profilePhoto: formData.basicInfo.profilePhoto,
				street: formData.address.street,
				city: formData.address.city,
				district: formData.address.district,
				zipCode: formData.address.zipCode,
				emergencyContacts: formData.other.emergencyContacts.map( ( contact:any ) => ( { name: contact.name, phoneNumber: contact.phoneNumber } ) )
			}
		};

		try {
			updateUser( { variables } );
		} catch ( error ) {
			RESTErrorHandler( error ); // todo: create graphql error handler
		}
	};

	if ( getUserLoading ) {
		return <LoadingIndicator />;
	}

	if ( error ) {
		return <ErrorComponent error={error} />;
	}

	return (
		<div className="d-flex row w-100 justify-content-center text-start">
			<div className="py-4 px-0">
				<Form schema={schema} uischema={uischema} data={initialFormData} handleSubmit={handleSubmit} isLoading={updateUserLoading} />
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
				phoneNumber: { type: 'string', title: 'Phone Number', pattern: '^\\(?([0-9]{3})\\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$' },
				dob: { type: 'string', format: 'date', title: 'Date of Birth' },
				profilePhoto: { type: 'string', title: 'Profile Photo' }
			},
			required: [ 'firstName', 'phoneNumber' ]
		},
		address: {
			type: 'object',
			properties: {
				street: { type: 'string', title: 'Street' },
				city: { type: 'string', title: 'City' },
				district: { type: 'string', title: 'District' },
				zipCode: { type: 'string', title: 'Zip Code', pattern: '^[0-9]{5}$', minLength: 5, maxLength: 5 }
			},
			required: [ 'street', 'city', 'district', 'zipCode' ]
		},
		other: {
			type: 'object',
			properties: {
				emergencyContacts: {
					type: 'array',
					title: 'Emergency Contacts',
					items: {
						type: 'object',
						properties: {
							name: { type: 'string', title: 'Contact Name' },
							phoneNumber: {
								type: 'string',
								title: 'Contact Phone Number',
								pattern: '^\\(?([0-9]{3})\\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$'
							}
						},
						required: [ 'name', 'phoneNumber' ]
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
							type: 'VerticalLayout',
							elements: [
								{
									type: 'FileUpload',
									scope: '#/properties/basicInfo/properties/profilePhoto',
									label: 'Profile Photo',
									accept: 'image/*'
								}
							]
						},
						{
							type: 'VerticalLayout',
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
									scope: '#/properties/basicInfo/properties/phoneNumber'
								},
								{
									type: 'Control',
									scope: '#/properties/basicInfo/properties/dob'
								},
								{
									type: 'Control',
									scope: '#/properties/basicInfo/properties/email',
									options: {
										readOnly: true
									}
								}
							]
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
							scope: '#/properties/address/properties/zipCode'
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
					type: 'HorizontalLayout',
					elements: [
						{
							type: 'Control',
							scope: '#/properties/other/properties/emergencyContacts',
							options: {
								detail: {
									type: 'HorizontalLayout',
									elements: [
										{
											type: 'Control',
											scope: '#/properties/name',
											label: 'Contact Name'
										},
										{
											type: 'Control',
											scope: '#/properties/phoneNumber',
											label: 'Phone Number'
										}
									]
								}
							}
						}
					]
				}
			]
		}
	]
};

export { Profile };

