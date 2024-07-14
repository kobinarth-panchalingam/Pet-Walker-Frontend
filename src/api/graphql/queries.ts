import { gql } from './__generated__/gql';

export const GET_USER = gql( `
    query GetUser {
        getUser {
            id
            email
            firstName
            lastName
            phoneNumber
            dob
            street
            city
            district
            zipCode
            profilePhoto
            emergencyContacts {
                name
                phoneNumber
            }
        }
    }
` );