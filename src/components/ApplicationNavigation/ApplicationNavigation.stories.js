import React from 'react';
import ApplicationNavigation from './index';

export default {
    title: 'Components/ApplicationNavigation',
    component: ApplicationNavigation,
};

export const Dashboard = () => <ApplicationNavigation />;

export const Savings = () => <ApplicationNavigation page="/savings" />;

export const Debts = () => <ApplicationNavigation page="/debts" />;
