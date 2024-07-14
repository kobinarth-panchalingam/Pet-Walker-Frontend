import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';

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

const httpLink = new HttpLink( {
	uri: import.meta.env.VITE_GRAPHQL_API_URL
} );

const apolloClient = new ApolloClient( {
	link: authLink.concat( httpLink ),
	cache: new InMemoryCache()
} );

export { apolloClient };