import React from 'react';
import Register from './index';
import { AuthContext } from '../../util/auth';

export default {
    title: 'Pages/Register',
    component: Register,
};

export const RegisterPage = () => (
    <AuthContext.Provider value={null}>
        <Register />
    </AuthContext.Provider>
);
