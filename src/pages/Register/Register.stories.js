import React from 'react';
import Register from './index';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'Pages/Register',
    component: Register,
};

export const RegisterPage = () => (
    <MemoryRouter>
        <Register />
    </MemoryRouter>
);
