import React from 'react';
import Home from './index';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'Pages/Home',
    component: Home,
};

export const HomePage = () => (
    <MemoryRouter>
        <Home />
    </MemoryRouter>
);
