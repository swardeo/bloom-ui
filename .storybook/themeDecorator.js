import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../src/theme';

const ThemeDecorator = (Story) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
    </ThemeProvider>
);

export default ThemeDecorator;
