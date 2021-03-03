import React from 'react';
import ListDebts from './index';

export default {
    title: 'Components/ListDebts',
    component: ListDebts,
};

const debts = [
    {
        name: 'Debt',
        startDate: '2012-05',
    },
    {
        name: 'Debt 2',
        startDate: '2009-06',
    },
    {
        name: 'Debt 3',
        startDate: '2015-03',
    },
];

export const NoDebts = () => <ListDebts />;

export const ListAllDebts = () => <ListDebts debts={debts} />;
