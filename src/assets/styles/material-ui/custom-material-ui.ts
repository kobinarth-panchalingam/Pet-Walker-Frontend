import { createTheme } from '@mui/material';

import variables from '../variables.module.scss';

export const customizedTheme = createTheme( {
	components: {
		MuiTextField: {
			defaultProps: {
				variant: 'outlined'
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				input: {
					'&.Mui-disabled': {
						opacity: '0.75',
						'-webkit-text-fill-color': `${variables.textColor} !important`
					}
				}
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
			primary: variables.textColor
		}
	},
	typography( palette ) {
		return {
			fontFamily: [
				'-apple-system',
				'Roboto',
				'"Segoe UI"',
				'BlinkMacSystemFont',
				'"Helvetica Neue"',
				'Arial',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"'
			].join( ',' ),
			h1: {
				color: palette.text.primary
			},
			h2: {
				color: palette.text.primary
			},
			h3: {

				color: palette.text.primary
			},
			h4: {
				color: palette.text.primary
			},
			h5: {
				color: palette.text.primary
			},
			h6: {
				color: palette.text.primary
			},
			subtitle1: {
				color: palette.text.primary
			},
			subtitle2: {

				color: palette.text.primary
			},
			body1: {
				color: palette.text.primary
			},
			body2: {

				color: palette.text.primary
			},
			button: {
				color: palette.text.primary
			},
			caption: {
				color: palette.text.primary
			},
			overline: {
				color: palette.text.primary
			}
		};
	}
} );
