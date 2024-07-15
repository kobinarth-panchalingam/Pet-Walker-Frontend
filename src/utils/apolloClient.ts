import { toast } from 'react-toastify';
import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';

import { SessionStorage, StorageManager } from './storageManager';

const storageManager = new StorageManager( new SessionStorage() );

type Context = {
	headers?: Record<string, string>;
  };

const authLink = new ApolloLink( ( operation, forward ) => {
	const storedToken = storageManager.getItem( 'token' );
	operation.setContext( ( { headers = {} }: Context ) => ( { headers: {
		authorization: storedToken ? `Bearer ${storedToken}` : '',
		...headers
	} } ) );
	return forward( operation );
} );

const removeTypenameLink = removeTypenameFromVariables();

const httpLink = new HttpLink( {
	uri: import.meta.env.VITE_GRAPHQL_API_URL
} );

const apolloClient = new ApolloClient( {
	link: from( [ authLink, removeTypenameLink, httpLink ] ),
	cache: new InMemoryCache()
} );

const GraphQLErrorHandler = ( error: ApolloError ) => {
	if ( error.graphQLErrors ) {
		error.graphQLErrors.forEach( ( { message } ) =>
			toast.error( `${message}` )
		);
	}
	if ( error.networkError ) {
		toast.error( `Network error: ${error.networkError.message}` );
	}
};

const GraphQLResponseHandler = ( response: any ) => {
	if ( response.success ) {
		toast.success( response.message );
	} else {
		toast.error( response.message );
	}
};

export { apolloClient, GraphQLErrorHandler, GraphQLResponseHandler };

