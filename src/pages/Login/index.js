import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Authenticator, Page } from '../../components';
import { useAuth } from '../../util/auth';

const Login = () => {
    const { state } = useLocation();
    const user = useAuth();
    const isLoggedIn = null !== user;

    return isLoggedIn ? (
        <Redirect to={state?.from || '/dashboard'} />
    ) : (
        <Page>
            <Authenticator initialState="signin" />
        </Page>
    );
};

export default Login;
