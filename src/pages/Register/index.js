import React from 'react';
import { Redirect } from 'react-router-dom';
import { Authenticator, Page } from '../../components';
import { useAuth } from '../../util/auth';

const Register = () => {
    const user = useAuth();
    const isLoggedIn = null !== user;

    return isLoggedIn ? (
        <Redirect to="/dashboard" />
    ) : (
        <Page>
            <Authenticator />
        </Page>
    );
};

export default Register;
