import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '@contexts/AuthContext.tsx';

import { apolloClient } from './utils/apolloClient.ts';
import App from './App.tsx';

import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<React.StrictMode>
		<ApolloProvider client={apolloClient}>
			<AuthProvider>
				<App />
				<ToastContainer/>
			</AuthProvider>
		</ApolloProvider>
	</React.StrictMode>
);
