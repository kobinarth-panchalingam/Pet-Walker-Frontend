import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '@contexts/AuthContext.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { customizedTheme } from './assets/styles/material-ui/custom-material-ui.ts';
import { apolloClient } from './utils/apolloClient.ts';
import App from './App.tsx';

import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<React.StrictMode>
		<ApolloProvider client={apolloClient}>
			<AuthProvider>
				<ThemeProvider theme={customizedTheme}>
					<CssBaseline/>
					<App />
					<ToastContainer className="toast-container"  position="top-right" />
				</ThemeProvider>
			</AuthProvider>
		</ApolloProvider>
	</React.StrictMode>
);
