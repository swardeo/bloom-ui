import React from 'react';
import SavingsForm from './index';
import { Container } from '@material-ui/core';

export default {
    title: 'Components/SavingsForm',
    component: SavingsForm,
};

const saving = {
    name: 'savingName',
    startAmount: '192.77',
    monthlyAmount: '15.00',
    startDate: '2013-05',
    endDate: '2020-11',
    yearlyRate: '1.50',
    adjustments: [
        {
            amount: '20.00',
            dateFrom: '2014-07',
            rate: '2.00',
        },
        {
            amount: '20.00',
            dateFrom: '2014-07',
            rate: '2.00',
        },
    ],
    oneTimePayments: [
        {
            amount: '-300.00',
            date: '2014-01',
        },
    ],
};

export const EmptySavingsForm = () => (
    <Container maxWidth="md">
        <SavingsForm />
    </Container>
);

export const PopulatedSavingsForm = () => (
    <Container maxWidth="md">
        <SavingsForm action="update" saving={saving} />
    </Container>
);
