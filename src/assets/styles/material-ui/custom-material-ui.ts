import { createTheme } from '@mui/material';

import variables from '../variables.module.scss';

export const customizedTheme = createTheme( {
	components: {
		MuiTextField: {
			defaultProps: {
				variant: 'outlined'
			}
		}
	},
	palette: {
		primary: {
			main: variables.primaryColor
		},
		secondary: {
			main: variables.secondaryColor
		},
		error: {
			main: variables.errorColor
		},
		warning: {
			main: variables.warningColor
		},
		info: {
			main: variables.infoColor
		},
		success: {
			main: variables.successColor
		},
		text: {
			primary: variables.textColor,
			secondary: variables.textColor
		},
		background: {
			default: variables.backgroundColor,
			paper: variables.backgroundColor
		}
	}
} );
