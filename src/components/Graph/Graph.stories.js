import React from 'react';
import Graph from './index';
import plotSavings from '../../data/plotSavings';

export default {
    title: 'Components/Graph',
    component: Graph,
};

const savings = [
    {
        name: 'Pension 1',
        startAmount: '100.00',
        monthlyAmount: '100.00',
        startDate: '2015-01',
        endDate: '2055-12',
        yearlyRate: '6.00',
        adjustments: [
            {
                amount: '0.00',
                dateFrom: '2025-01',
                rate: '6.00',
            },
        ],
    },
    {
        name: 'Pension 2',
        startAmount: '0.00',
        monthlyAmount: '0.00',
        startDate: '2015-01',
        endDate: '2055-12',
        yearlyRate: '0.00',
        adjustments: [
            {
                amount: '100.00',
                dateFrom: '2025-01',
                rate: '6.00',
            },
        ],
    },
];

const data = plotSavings(savings);

export const BasicGraph = () => <Graph data={data} />;
