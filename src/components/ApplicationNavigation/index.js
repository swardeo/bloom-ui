import React from 'react';
import { Breadcrumbs, Link, Typography, Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavigationLink = ({ page, text, to }) => {
    return page === to ? (
        <Typography
            variant="h6"
            colour="primary"
            style={{ fontWeight: 'bold' }}
        >
            {text}
        </Typography>
    ) : (
        <Link color="secondary" key="dashboard" component={RouterLink} to={to}>
            {text}
        </Link>
    );
};

const ApplicationNavigation = ({ page }) => {
    return (
        <Grid container direction="column" alignItems="center" justify="center">
            <Grid item xs={12}>
                <Breadcrumbs>
                    <NavigationLink
                        page={page}
                        text="Dashboard"
                        to="/dashboard"
                    />
                    <NavigationLink page={page} text="Savings" to="/savings" />
                    <NavigationLink page={page} text="Debts" to="/debts" />
                </Breadcrumbs>
            </Grid>
        </Grid>
    );
};

ApplicationNavigation.defaultProps = {
    page: '/dashboard',
};

ApplicationNavigation.propTypes = {
    page: PropTypes.oneOf(['/dashboard', '/savings', '/debts']),
};

export default ApplicationNavigation;
