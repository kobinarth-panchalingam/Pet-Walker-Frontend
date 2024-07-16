import React, { useMemo } from 'react';
import { GET_USER, UPDATE_USER } from '@api';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { getChangedFields, GraphQLErrorHandler, GraphQLResponseHandler } from '@utils';

import profile from '../../assets/images/profile.png';
import { ErrorComponent } from '../common/ErrorComponent';
import { Form } from '../common/Form';
import { LoadingIndicator } from '../common/LoadingIndicator';

const Profile: React.FC = () => {
	const { data, loading: getUserLoading, error: getUserError, refetch } = useQuery( GET_USER );

	const user = data?.getUser;
	const initialFormData = useMemo( () => ( {
		firstName: user?.firstName,
		lastName: user?.lastName || undefined,
		phoneNumber: user?.phoneNumber || undefined,
		dob: user?.dob || undefined,
		email: user?.email,
		profilePhoto: user?.profilePhoto || profile,
		street: user?.street || undefined,
		city: user?.city || undefined,
		district: user?.district || undefined,
		zipCode: user?.zipCode || undefined,
		emergencyContacts: user?.emergencyContacts || []
	} ), [ user ] );

	const [ updateUser, { loading: updateUserLoading } ] = useMutation( UPDATE_USER );

	const handleSubmit = async( formData:any ) => {
		try {
			const { data } = await updateUser( {
				variables: {
					input: getChangedFields( initialFormData, formData )
				} } );
			GraphQLResponseHandler( data?.updateUser );
			refetch();
		} catch ( error ) {
			GraphQLErrorHandler( error as ApolloError );
		}
	};

	if ( getUserLoading ) {
		return <LoadingIndicator />;
	}

	if ( getUserError ) {
		return <ErrorComponent error={getUserError} />;
	}

	return (
		<div className="d-flex justify-content-center align-items-center w-100 py-3">
			<Form schema={schema} uischema={uischema} data={initialFormData} handleSubmit={handleSubmit} isLoading={updateUserLoading} />
		</div>
	);
};

const schema = {
	type: 'object',
	properties: {
		firstName: {
			type: 'string',
			title: 'First Name'
		},
		lastName: {
			type: 'string',
			title: 'Last Name'
		},
		email: {
			type: 'string',
			title: 'Email',
			format: 'email'
		},
		phoneNumber: {
			type: 'string',
			title: 'Phone Number',
			pattern: '^\\(?([0-9]{3})\\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$'
		},
		dob: {
			type: 'string',
			format: 'date',
			title: 'Date of Birth'
		},
		profilePhoto: {
			type: 'string',
			title: 'Profile Photo'
		},
		street: {
			type: 'string',
			title: 'Street'
		},
		city: {
			type: 'string',
			title: 'City'
		},
		district: {
			type: 'string',
			title: 'District'
		},
		zipCode: {
			type: 'string',
			title: 'Zip Code',
			pattern: '^[0-9]{5}$',
			minLength: 5,
			maxLength: 5
		},
		emergencyContacts: {
			type: 'array',
			title: 'Emergency Contacts',
			items: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
						title: 'Contact Name'
					},
					phoneNumber: {
						type: 'string',
						title: 'Contact Phone Number',
						pattern: '^\\(?([0-9]{3})\\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$'
					}
				},
				required: [
					'name',
					'phoneNumber'
				]
			}
		}
	},
	required: [
		'firstName',
		'phoneNumber',
		'street',
		'city',
		'district',
		'zipCode'
	]
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
									scope: '#/properties/profilePhoto',
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
									scope: '#/properties/firstName'
								},
								{
									type: 'Control',
									scope: '#/properties/lastName'
								},
								{
									type: 'Control',
									scope: '#/properties/phoneNumber'
								},
								{
									type: 'Control',
									scope: '#/properties/dob'
								},
								{
									type: 'Control',
									scope: '#/properties/email',
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
							scope: '#/properties/street'
						}
					]
				},
				{
					type: 'HorizontalLayout',
					elements: [
						{
							type: 'Control',
							scope: '#/properties/city'
						},
						{
							type: 'Control',
							scope: '#/properties/district'
						},
						{
							type: 'Control',
							scope: '#/properties/zipCode'
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
							scope: '#/properties/emergencyContacts',
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

