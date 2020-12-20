import React from 'react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'Components/Header',
    component: Header,
};

export const UnauthenticatedHeader = () => (
    <MemoryRouter>
        <Header />
    </MemoryRouter>
);

export const AuthenticatedHeader = () => (
    <MemoryRouter>
        <Header authenticated={true} />
    </MemoryRouter>
);
