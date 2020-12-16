import React from 'react';
import { Redirect } from 'react-router-dom';
import Authenticator from '../../components/Authenticator';
import Header from '../../components/Header';
import useCurrentUser from '../../util/useCurrentUser';

const Register = () => {
    const userStatus = useCurrentUser();
    const isLoggedIn = null !== userStatus;

    return isLoggedIn ? (
        <Redirect to="/" />
    ) : (
        <>
            <Header />
            <Authenticator />
        </>
    );
};

export default Register;
