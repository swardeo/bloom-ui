import React from 'react';
import { Oops, NotFound } from './index';

export default {
    title: 'Pages/Errors',
    component: { Oops, NotFound },
};

export const OopsPage = () => <Oops />;

export const NotFoundPage = () => <NotFound />;
