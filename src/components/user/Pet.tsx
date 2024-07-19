import React from 'react';

// import {  UPDATE_USER } from '@api';
// import { ApolloError, useMutation, useQuery } from '@apollo/client';
// import { getChangedFields, GraphQLErrorHandler, GraphQLResponseHandler } from '@utils';
// import { options } from 'node_modules/axios/index.d.cts';
// import profile from '../../assets/images/profile.png';
// import { ErrorComponent } from '../common/ErrorComponent';
import { Form } from '../common/Form';
// import { LoadingIndicator } from '../common/LoadingIndicator';

const Pet: React.FC = () => {
	// const { data, loading: getUserLoading, error: getUserError, refetch } = useQuery( GET_USER );
	const data = {
	};
	// const [ updateUser, { loading: updateUserLoading } ] = useMutation( UPDATE_USER );

	const handleSubmit = async( formData:any ) => {
		console.log( formData );
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
			<Form schema={schema( [ 'a' ] )} uischema={uischema} data={data} handleSubmit={handleSubmit} isLoading={false} />
		</div>
	);
};

const schema = ( breeds: string[] ) => ( {
	type: 'object',
	properties: {
		photo: {
			type: 'string',
			title: 'Photo'
		},
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
			title: 'Gender',
			oneOf: [
				{
					const: 'MALE',
					title: 'Male'
				},
				{
					const: 'FEMALE',
					title: 'Female'
				}
			]
		},
		weight: {
			type: 'number',
			title: 'Weight (kg)'
		},
		spayedNeutered: {
			type: 'string',
			title: 'Spayed/Neutered',
			oneOf: [
				{
					const: 'YES',
					title: 'Yes'
				},
				{
					const: 'NO',
					title: 'No'
				}
			]
		},
		vaccinated: {
			type: 'string',
			title: 'Vaccinated',
			oneOf: [
				{
					const: 'YES',
					title: 'Yes'
				},
				{
					const: 'NO',
					title: 'No'
				}
			]
		},
		energyLevel: {
			type: 'string',
			title: 'Energy Level',
			oneOf: [
				{
					const: 'LOW',
					title: 'Low'
				},
				{
					const: 'MEDIUM',
					title: 'Medium'
				},
				{
					const: 'HIGH',
					title: 'High'
				}
			]
		},
		preferredWalkingSchedule: {
			type: 'array',
			title: 'Preferred Walking Schedule',
			items: {
				type: 'string',
				oneOf: [
					{
						const: 'MORNING',
						title: 'Morning'
					},
					{
						const: 'AFTERNOON',
						title: 'Afternoon'
					},
					{
						const: 'EVENING',
						title: 'Evening'
					},
					{
						const: 'NIGHT',
						title: 'Night'
					}
				]
			},
			minItems: 1,
			uniqueItems: true
		},
		feedingSchedule: {
			type: 'object',
			properties: {
				value: {
					type: 'string',
					title: 'Feeding Schedule',
					oneOf: [
						{
							const: 'MORNING',
							title: 'Morning'
						},
						{
							const: 'TWICE_A_DAY',
							title: 'Twice a Day'
						},
						{
							const: 'CUSTOM',
							title: 'Custom',
							description: 'Specify the custom feeding schedule.'
						}
					]
				},
				additionalDetails: {
					type: 'string',
					title: 'Custom Feeding Schedule Details',
					description: 'Specify the custom feeding schedule.'
				}
			}
		},
		pottyBreakSchedule: {
			type: 'object',
			properties: {
				value: {
					type: 'string',
					title: 'Potty Break Schedule',
					oneOf: [
						{
							const: 'EVERY_HOUR',
							title: 'Every Hour'
						},
						{
							const: 'TWO_HOURS',
							title: '2 Hours'
						},
						{
							const: 'FOUR_HOURS',
							title: '4 Hours'
						},
						{
							const: 'EIGHT_HOURS',
							title: '8 Hours'
						},
						{
							const: 'CUSTOM',
							title: 'Custom'
						}
					]
				},
				additionalDetails: {
					type: 'string',
					title: 'Custom Potty Break Schedule Details',
					description: 'Specify the custom potty break schedule.'
				}
			}
		},
		specialRequirements: {
			type: 'string',
			title: 'Special Requirements'
		},
		dietaryRestrictions: {
			type: 'string',
			title: 'Dietary Restrictions'
		},
		behavioralTraits: {
			type: 'string',
			title: 'Behavioral Traits'
		}
	},
	required: [
		'petType',
		'petName',
		'breed',
		'ageYears',
		'ageMonths',
		'weight',
		'gender',
		'spayedNeutered',
		'vaccinated',
		'energyLevel',
		'preferredWalkingSchedule',
		'feedingSchedule'
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
				},
				{
					type: 'Control',
					scope: '#/properties/energyLevel',
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
					scope: '#/properties/feedingSchedule/properties/value',
					options: {
						format: 'radio'
					}
				},
				{
					type: 'Control',
					scope: '#/properties/feedingSchedule/properties/additionalDetails',
					rule: {
						effect: 'SHOW',
						condition: {
							scope: '#/properties/feedingSchedule/properties/value',
							schema: { const: 'CUSTOM' }
						}
					}
				},
				{
					type: 'Control',
					scope: '#/properties/pottyBreakSchedule/properties/value',
					options: {
						format: 'radio'
					}
				},
				{
					type: 'Control',
					scope: '#/properties/pottyBreakSchedule/properties/additionalDetails',
					rule: {
						effect: 'SHOW',
						condition: {
							scope: '#/properties/pottyBreakSchedule/properties/value',
							schema: { const: 'CUSTOM' }
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

