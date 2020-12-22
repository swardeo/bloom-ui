import React from 'react';
import PrivacyPolicy from './index';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'Pages/PrivacyPolicy',
    component: PrivacyPolicy,
};

export const PrivacyPolicyPage = () => (
    <MemoryRouter>
        <PrivacyPolicy />
    </MemoryRouter>
);
