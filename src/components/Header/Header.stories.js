import React from 'react';
import Header from './Header';

export default {
    title: 'Components/Header',
    component: Header,
};

export const UnauthenticatedHeader = () => <Header />;

export const AuthenticatedHeader = () => <Header authenticated={true} />;
