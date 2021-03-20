import React from 'react';
import Faq from './index';

export default {
    title: 'Components/Faq',
    component: Faq,
};

export const DefaultFaq = () => <Faq />;

export const FilteredFaq = () => <Faq id="savings-in-bloom" />;
