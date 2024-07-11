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
			primary: variables.textColor
		}
	},
	typography( palette ) {
		return {
			h1: {
				fontSize: '2.5rem',
				fontWeight: 500,
				color: palette.text.primary
			},
			h2: {
				fontSize: '2rem',
				fontWeight: 500,
				color: palette.text.primary
			},
			h3: {
				fontSize: '1.75rem',
				fontWeight: 500,
				color: palette.text.primary
			},
			h4: {
				fontSize: '1.5rem',
				fontWeight: 500,
				color: palette.text.primary
			},
			h5: {
				fontSize: '1.25rem',
				fontWeight: 500,
				color: palette.text.primary
			},
			h6: {
				fontSize: '1rem',
				fontWeight: 500,
				color: palette.text.primary
			},
			subtitle1: {
				fontSize: '1rem',
				fontWeight: 400,
				color: palette.text.primary
			},
			subtitle2: {
				fontSize: '0.875rem',
				fontWeight: 400,
				color: palette.text.primary
			},
			body1: {
				fontSize: '1rem',
				fontWeight: 400,
				color: palette.text.primary
			},
			body2: {
				fontSize: '0.875rem',
				fontWeight: 400,
				color: palette.text.primary
			},
			button: {
				fontSize: '1rem',
				fontWeight: 500,
				color: palette.text.primary
			},
			caption: {
				fontSize: '0.75rem',
				fontWeight: 400,
				color: palette.text.primary
			},
			overline: {
				fontSize: '0.625rem',
				fontWeight: 400,
				color: palette.text.primary
			}
		};
	}
} );
