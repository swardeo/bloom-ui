import {
    unstable_createMuiStrictModeTheme as createMuiTheme,
    responsiveFontSizes,
} from '@material-ui/core/styles';
import './amplifyTheme.css';

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1D3557',
        },
        secondary: {
            main: '#457B9D',
        },
        info: {
            main: '#A8DADC',
        },
        text: {
            primary: '#1D3557',
            secondary: '#3663A2',
        },
        error: {
            main: '#E63946',
        },
    },
    overrides: {
        MuiFormLabel: {
            root: {
                color: '#3663A2',
            },
        },
        MuiBreadcrumbs: {
            root: {
                fontSize: '1.25rem',
            },
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
