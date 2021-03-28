import React, { useState, useEffect } from 'react';
import { ApplicationNavigation, Graph, Page } from '../../components';
import plot from '../../data';
import { API } from 'aws-amplify';
import config from '../../config';
import { styled } from '@material-ui/core/styles';
import {
    Grid,
    CircularProgress,
    Container,
    Divider,
    Typography,
    Link,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../util/auth';

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    textDecoration: 'none',
}));

const StyledProgress = styled(CircularProgress)(({ theme }) => ({
    marginTop: theme.spacing(5),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

const StyledText = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.h5.fontSize,
}));

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [plottedData, setPlottedData] = useState();
    const user = useAuth();

    useEffect(() => {
        listItems();
    }, []);

    const listItems = async () => {
        const savings = await API.get(config.api.NAME, '/savings', null).catch(
            () => {
                setError(true);
            }
        );

        const debts = await API.get(config.api.NAME, '/debts', null).catch(
            () => {
                setError(true);
            }
        );
        setPlottedData(plot(savings, debts));
        setLoading(false);
    };

    const Content = () => {
        return plottedData.length > 0 ? (
            <>
                <StyledText>
                    {user.attributes.given_name}, here is your financial
                    forecast
                </StyledText>
                <Graph data={plottedData} />
                <Container maxWidth="sm">
                    <Alert severity="warning" variant="outlined">
                        Bloom has been created by a student at Aston University
                        and does not serve as financial advice in any capacity.
                    </Alert>
                </Container>
            </>
        ) : (
            <>
                <Typography variant="h5" paragraph>
                    Welcome to Bloom!
                </Typography>
                <Typography variant="h6" paragraph>
                    You have not yet added any savings or debts. Check back here
                    once you have to see how they look.
                </Typography>
                <Typography paragraph>
                    For more information about what is possible in Bloom,{' '}
                    <StyledLink
                        key="examples"
                        component={RouterLink}
                        to={'/examples'}
                        target="_blank"
                    >
                        take a look at some examples.
                    </StyledLink>
                </Typography>
                <Typography>
                    Have any questions?{' '}
                    <StyledLink
                        key="frequently asked questions"
                        component={RouterLink}
                        to={'/faq'}
                        target="_blank"
                    >
                        See if they can be answered using the Frequently Asked
                        Questions.
                    </StyledLink>
                </Typography>
            </>
        );
    };

    if (loading) {
        return (
            <Page>
                <Grid container justify="center">
                    <StyledProgress />
                </Grid>
            </Page>
        );
    }
    if (error) {
        return <Redirect to="/oops" />;
    }
    return (
        <Page maxWidth={plottedData.length > 0 ? 'lg' : 'md'}>
            <ApplicationNavigation />
            <Typography variant="h4" gutterBottom>
                My Dashboard
            </Typography>
            <StyledDivider />
            <Content />
        </Page>
    );
};

export default Dashboard;
