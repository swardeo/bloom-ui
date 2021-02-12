import React from 'react';
import ApplicationNavigation from '../../components/ApplicationNavigation';
import Page from '../../components/Page';
import { Typography } from '@material-ui/core';

const Dashboard = () => {
    return (
        <Page>
            <ApplicationNavigation />
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
        </Page>
    );
};

export default Dashboard;
