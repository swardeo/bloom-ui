import React from 'react';
import ListSavings from './index';

export default {
    title: 'Components/ListSavings',
    component: ListSavings,
};

const savings = [
    {
        name: 'savingName',
        startDate: '2012-05',
        endDate: '2020-11',
    },
    {
        name: 'savingName2',
        startDate: '2009-06',
        endDate: '2021-01',
    },
    {
        name: 'savingName3',
        startDate: '2015-03',
        endDate: '2018-12',
    },
];

export const NoSavings = () => <ListSavings />;

export const ListAllSavings = () => <ListSavings savings={savings} />;
