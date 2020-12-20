import React from 'react';
import Login from './index';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'Pages/Login',
    component: Login,
};

export const LoginPage = () => (
    <MemoryRouter>
        <Login />
    </MemoryRouter>
);
