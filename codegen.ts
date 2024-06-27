import { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config( {
	path: '.env.development'
} );

const config: CodegenConfig = {
	schema: `${process.env.VITE_GRAPHQL_API_URL}`,
	documents: [ 'src/api/graphql/*.ts' ],
	generates: {
		'./src/api/graphql/__generated__/': {
			preset: 'client',
			presetConfig: {
				gqlTagName: 'gql'
			}
		}
	},
	ignoreNoDocuments: false
};

export default config;