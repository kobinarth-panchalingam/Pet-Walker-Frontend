import { gql } from './__generated__/gql';

export const GET_USERS = gql( `
    query GetUsers {
        getUsers {
            id
            email
            firstName
            lastName
            address
            status
            role
            createdAt
        }
    }
` );