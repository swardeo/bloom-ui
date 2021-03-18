import React from 'react';
import Graph from './index';
import plot from '../../data';

export default {
    title: 'Components/Graph',
    component: Graph,
};

const savings = [
    {
        name: 'House Deposit',
        startAmount: '0.00',
        monthlyAmount: '100.00',
        startDate: '2015-01',
        endDate: '2020-10',
        yearlyRate: '0.30',
        adjustments: [
            {
                amount: '75.00',
                dateFrom: '2017-01',
                rate: '0.40',
            },
        ],
        oneTimePayments: [],
    },
    {
        name: 'Wedding',
        startAmount: '0.00',
        monthlyAmount: '150.00',
        startDate: '2014-05',
        endDate: '2017-07',
        yearlyRate: '0.20',
        adjustments: [],
        oneTimePayments: [
            {
                amount: '400.00',
                date: '2015-11',
            },
        ],
    },
];

const debts = [
    {
        name: 'Car Loan',
        startAmount: '5000.00',
        monthlyAmount: '200.00',
        startDate: '2015-02',
        yearlyRate: '3.00',
        adjustments: [],
        oneTimePayments: [],
    },
    {
        name: 'Holiday',
        startAmount: '2000.00',
        monthlyAmount: '100.00',
        startDate: '2011-11',
        yearlyRate: '3.00',
        adjustments: [
            {
                amount: '500.00',
                dateFrom: '2012-02',
                rate: '1.50',
            },
        ],
        oneTimePayments: [],
    },
];

export const SavingsOnly = () => <Graph data={plot(savings, [])} />;

export const DebtsOnly = () => <Graph data={plot([], debts)} />;

export const Both = () => <Graph data={plot(savings, debts)} />;
