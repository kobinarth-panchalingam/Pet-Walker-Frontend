import { gql } from './__generated__/gql';

export const UPDATE_USER = gql( `
    mutation UpdateUser($input: UserUpdate!) {
        updateUser(input: $input) {
            id
        }
    }
` );