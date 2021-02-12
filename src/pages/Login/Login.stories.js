import React from 'react';
import Login from './index';
import { AuthContext } from '../../util/auth';

export default {
    title: 'Pages/Login',
    component: Login,
};

export const LoginPage = () => (
    <AuthContext.Provider value={null}>
        <Login />
    </AuthContext.Provider>
);
