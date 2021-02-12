import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Amplify, { Auth } from 'aws-amplify';
import config from './config';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    },
    API: {
        endpoints: [
            {
                name: config.api.NAME,
                endpoint: config.api.ENDPOINT,
                custom_header: async () => {
                    return {
                        Authorization: (await Auth.currentSession())
                            .getIdToken()
                            .getJwtToken(),
                    };
                },
            },
        ],
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
