import React from 'react';
import { MemoryRouter } from 'react-router-dom';

const RouterDecorator = (Story) => (
    <MemoryRouter>
        <Story />
    </MemoryRouter>
);

export default RouterDecorator;
