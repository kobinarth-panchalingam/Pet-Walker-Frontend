import React, { createContext, useEffect, useState } from 'react';
import { User } from '@types';
import { parseToken, SessionStorage, StorageManager } from '@utils';

interface AuthState {
    isAuthenticated: boolean;
	isLoading: boolean;
    user: User | null;
    token: string | null;
    login: ( token: string ) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthState>( {
	isAuthenticated: false,
	isLoading: true,
	user: null,
	token: null,
	login: () => {},
	logout: () => {}
} );

interface AuthProviderProps {
	children: React.ReactNode;
  }

const AuthProvider: React.FC<AuthProviderProps> = ( { children } ) => {
	const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>( false );
	const [ user, setUser ] = useState<User | null>( null );
	const [ token, setToken ] = useState<string | null>( null );
	const [ isLoading, setIsLoading ] = useState<boolean>( true );
	const storageManager = new StorageManager( new SessionStorage() );

	// Check for token in storage on app load
	useEffect( () => {
		const storedToken = storageManager.getItem( 'token' );
		if ( storedToken ) {
			const decodedUser = parseToken( storedToken );
			if ( decodedUser ) {
				setToken( storedToken );
				setUser( decodedUser );
				setIsAuthenticated( true );
			}
		}
		setIsLoading( false );
	}, [] );

	// Handle login function
	const login = ( token: string ) => {
		const decodedUser = parseToken( token );
		if ( decodedUser ) {
			storageManager.setItem( 'token', token );
			setToken( token );
			setUser( decodedUser );
			setIsAuthenticated( true );
		}
	};

	// Handle logout function
	const logout = () => {
		storageManager.clear();
		setToken( null );
		setUser( null );
		setIsAuthenticated( false );

	};

	// Provide the context value to children components
	const contextValue: AuthState = {
		isAuthenticated,
		isLoading,
		user,
		token,
		login,
		logout
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
