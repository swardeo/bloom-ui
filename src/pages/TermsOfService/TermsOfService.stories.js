import React from 'react';
import TermsOfService from './index';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'Pages/TermsOfService',
    component: TermsOfService,
};

export const TermsOfServicePage = () => (
    <MemoryRouter>
        <TermsOfService />
    </MemoryRouter>
);
