import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient( {
	uri: import.meta.env.VITE_GRAPHQL_API_URL,
	cache: new InMemoryCache()
} );

export { apolloClient };