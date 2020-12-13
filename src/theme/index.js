import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
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
    },
});

theme = responsiveFontSizes(theme);

export default theme;
