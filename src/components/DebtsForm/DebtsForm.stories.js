import React from 'react';
import DebtsForm from './index';
import { Container } from '@material-ui/core';

export default {
    title: 'Components/DebtsForm',
    component: DebtsForm,
};

const debt = {
    name: 'Debt',
    startAmount: '5000.77',
    monthlyAmount: '15.00',
    startDate: '2013-05',
    yearlyRate: '1.50',
    adjustments: [
        {
            amount: '20.00',
            dateFrom: '2014-07',
            rate: '2.00',
        },
        {
            amount: '30.00',
            dateFrom: '2015-07',
            rate: '2.50',
        },
    ],
    oneTimePayments: [
        {
            amount: '300.00',
            date: '2014-01',
        },
    ],
};

export const EmptyDebtsForm = () => (
    <Container maxWidth="md">
        <DebtsForm />
    </Container>
);

export const PopulatedDebtsForm = () => (
    <Container maxWidth="md">
        <DebtsForm action="update" debt={debt} />
    </Container>
);
