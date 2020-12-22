import React from 'react';
import Footer from './index';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'Components/Footer',
    component: Footer,
};

export const StandardFooter = () => (
    <MemoryRouter>
        <Footer />
    </MemoryRouter>
);
