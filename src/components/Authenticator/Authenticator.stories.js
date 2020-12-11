import React from 'react';
import Authenticator from './index';

export default {
    title: 'Components/Authenticator',
    component: Authenticator,
};

export const SignUp = () => <Authenticator />;

export const SignIn = () => <Authenticator initialState="signin" />;
