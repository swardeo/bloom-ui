import React from 'react';
import { Redirect } from 'react-router-dom';
import Authenticator from '../../components/Authenticator';
import Page from '../../components/Page';
import { useAuth } from '../../util/auth';

const Login = () => {
    const user = useAuth();
    const isLoggedIn = null !== user;

    return isLoggedIn ? (
        <Redirect to="/dashboard" />
    ) : (
        <Page>
            <Authenticator initialState="signin" />
        </Page>
    );
};

export default Login;
