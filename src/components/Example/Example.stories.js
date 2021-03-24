import React from 'react';
import Example from './index';

export default {
    title: 'Components/Example',
    component: Example,
};

export const SavingExample = () => <Example />;

export const DebtExample = () => <Example type="debts" />;

export const ComplexExample = () => <Example type="complex" />;
