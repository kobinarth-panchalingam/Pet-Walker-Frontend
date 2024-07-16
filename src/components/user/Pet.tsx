import React, { useMemo } from 'react';
import { GET_USER, UPDATE_USER } from '@api';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { getChangedFields, GraphQLErrorHandler, GraphQLResponseHandler } from '@utils';
import { options } from 'node_modules/axios/index.d.cts';

import profile from '../../assets/images/profile.png';
import { ErrorComponent } from '../common/ErrorComponent';
import { Form } from '../common/Form';
import { LoadingIndicator } from '../common/LoadingIndicator';

const Pet: React.FC = () => {
	// const { data, loading: getUserLoading, error: getUserError, refetch } = useQuery( GET_USER );
	const data = {
		spayedNeutered: 'Yes',
		feedingSchedule: 'Custom',
		customFeedingSchedule: 'Custom Feeding Schedule Details'
	};
	const [ updateUser, { loading: updateUserLoading } ] = useMutation( UPDATE_USER );

	const handleSubmit = async( formData:any ) => {
		// try {
		// 	const { data } = await updateUser( {
		// 		variables: {
		// 			input: getChangedFields( initialFormData, formData )
		// 		} } );
		// 	GraphQLResponseHandler( data?.updateUser );
		// 	refetch();
		// } catch ( error ) {
		// 	GraphQLErrorHandler( error as ApolloError );
		// }
	};

	// if ( getUserLoading ) {
	// 	return <LoadingIndicator />;
	// }

	// if ( getUserError ) {
	// 	return <ErrorComponent error={getUserError} />;
	// }

	return (
		<div className="d-flex justify-content-center align-items-center w-100 py-3">
			<Form schema={schema( [ 'a' ] )} uischema={uischema} data={data} handleSubmit={handleSubmit} isLoading={updateUserLoading} />
		</div>
	);
};

const schema = ( breeds: string[] ) => ( {
	type: 'object',
	properties: {
		petType: {
			type: 'string',
			title: 'Pet Type',
			enum: [
				'Dog',
				'Cat'
			]
		},
		petName: {
			type: 'string',
			title: 'Pet Name'
		},
		breed: {
			type: 'string',
			title: 'Breed',
			enum: breeds
		},
		ageYears: {
			type: 'integer',
			title: 'Age (Years)',
			minimum: 0
		},
		ageMonths: {
			type: 'integer',
			title: 'Age (Month)',
			minimum: 0,
			maximum: 11
		},
		gender: {
			type: 'string',
			title: 'Gender',
			enum: [
				'Male',
				'Female'
			]
		},
		weight: {
			type: 'number',
			title: 'Weight (kg)'
		},
		spayedNeutered: {
			type: 'string',
			title: 'Spayed/Neutered',
			enum: [
				'Yes',
				'No'
			]
		},
		vaccinated: {
			type: 'string',
			title: 'Vaccinated',
			enum: [
				'Yes',
				'No'
			]
		},
		specialRequirements: {
			type: 'string',
			title: 'Special Requirements'
		},
		photo: {
			type: 'string',
			title: 'Photo'
		},
		preferredWalkingSchedule: {
			type: 'array',
			title: 'Preferred Walking Schedule',
			items: {
				type: 'string',
				enum: [
					'Morning',
					'Afternoon',
					'Evening',
					'Night'
				]
			},
			uniqueItems: true
		},
		activityLevel: {
			type: 'string',
			title: 'Activity Level',
			enum: [
				'Low',
				'Medium',
				'High'
			]
		},
		dietaryRestrictions: {
			type: 'string',
			title: 'Dietary Restrictions'
		},
		behavioralTraits: {
			type: 'string',
			title: 'Behavioral Traits'
		},
		feedingSchedule: {
			type: 'string',
			title: 'Feeding Schedule',
			enum: [
				'Morning',
				'Twice a Day',
				'Custom'
			]
		},
		customFeedingSchedule: {
			type: 'string',
			title: 'Custom Feeding Schedule Details',
			description: 'Specify the custom feeding schedule.'
		},
		pottyBreakSchedule: {
			type: 'string',
			title: 'Potty Break Schedule',
			enum: [
				'Every Hour',
				'2 Hours',
				'4 Hours',
				'8 Hours',
				'Custom'
			],
			default: 'Every Hour'
		},
		customPottyBreakSchedule: {
			type: 'string',
			title: 'Custom Potty Break Schedule Details',
			description: 'Specify the custom potty break schedule.'
		}
	},
	required: [
		'petName',
		'petType',
		'breed',
		'age',
		'gender',
		'weight',
		'color',
		'spayedNeutered',
		'vaccinated'
	]
} );

const uischema = {
	type: 'VerticalLayout',
	elements: [
		{
			type: 'Group',
			label: 'Pet Details',
			elements: [
				{
					type: 'HorizontalLayout',
					elements: [
						{
							type: 'VerticalLayout',
							elements: [
								{
									type: 'FileUpload',
									scope: '#/properties/photo',
									label: 'Add Pet Photo',
									accept: 'image/*'
								}
							]
						},
						{
							type: 'VerticalLayout',
							elements: [
								{
									type: 'Control',
									scope: '#/properties/petType'
								},
								{
									type: 'Control',
									scope: '#/properties/petName'
								},
								{
									type: 'Control',
									scope: '#/properties/breed',
									options: {
										autocomplete: true
									}
								},
								{
									type: 'HorizontalLayout',
									elements: [
										{
											type: 'Control',
											scope: '#/properties/ageYears'
										},
										{
											type: 'Control',
											scope: '#/properties/ageMonths'
										}
									]
								},
								{
									type: 'HorizontalLayout',
									elements: [
										{
											type: 'Control',
											scope: '#/properties/weight'
										},
										{
											type: 'HorizontalLayout',
											elements: [
												{
													type: 'Control',
													scope: '#/properties/gender'
												}
											]
										}
									]
								}


							]
						}
					]
				}
			]
		},
		{
			type: 'Group',
			label: 'Health Information',
			elements: [
				{
					type: 'Control',
					scope: '#/properties/spayedNeutered',
					options: {
						format: 'radio'
					}
				},
				{
					type: 'Control',
					scope: '#/properties/vaccinated',
					options: {
						format: 'radio'
					}
				}
			]
		},
		{
			type: 'Group',
			label: 'Schedule Preferences',
			elements: [
				{
					type: 'Control',
					scope: '#/properties/preferredWalkingSchedule'
				},
				{
					type: 'Control',
					scope: '#/properties/feedingSchedule',
					options: {
						'format': 'radio'
					}
				},
				{
					type: 'Control',
					scope: '#/properties/customFeedingSchedule',
					rule: {
						effect: 'SHOW',
						condition: {
							scope: '#/properties/feedingSchedule',
							schema: { const: 'Custom' }
						}
					}
				},
				{
					type: 'Control',
					scope: '#/properties/pottyBreakSchedule',
					options: {
						format: 'radio'
					}
				},
				{
					type: 'Control',
					scope: '#/properties/customPottyBreakSchedule',
					rule: {
						effect: 'SHOW',
						condition: {
							scope: '#/properties/pottyBreakSchedule',
							schema: { const: 'Custom' }
						}
					}
				}
			]
		},
		{
			type: 'Group',
			label: 'Additional Details',
			elements: [
				{
					type: 'Control',
					scope: '#/properties/specialRequirements',
					options: {
						multi: true
					}
				},
				{
					type: 'Control',
					scope: '#/properties/dietaryRestrictions',
					options: {
						multi: true
					}
				},
				{
					type: 'Control',
					scope: '#/properties/behavioralTraits',
					options: {
						multi: true
					}
				}
			]
		}
	]
};



export { Pet };

