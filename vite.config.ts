import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig( {
	plugins: [ react() ],
	envPrefix: 'VITE_',
	resolve: {
		alias: {
			'@': path .resolve( __dirname, './src' ),
			'@api': path .resolve( __dirname, './src/api' ),
			'@utils': path .resolve( __dirname, './src/utils' ),
			'@hooks': path .resolve( __dirname, './src/hooks' ),
			'@constants': path .resolve( __dirname, './src/constants' ),
			'@contexts': path .resolve( __dirname, './src/contexts' )
		}
	}
} );
