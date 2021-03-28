import React, { useEffect, useState } from 'react';
import {
    ApplicationNavigation,
    Page,
    SavingsForm,
    ListSavings,
} from '../../components';
import { styled } from '@material-ui/core/styles';
import {
    Button,
    CircularProgress,
    Grid,
    Divider,
    Typography,
} from '@material-ui/core';
import { API } from 'aws-amplify';
import config from '../../config';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Redirect } from 'react-router-dom';

const StyledProgress = styled(CircularProgress)(({ theme }) => ({
    marginTop: theme.spacing(5),
}));

const StyledHeaderGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row-reverse',
    },
}));

const StyledBackButton = styled(Button)({
    margin: '0 auto',
    float: 'right',
});

const StyledAddButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

const Savings = () => {
    const [loading, setLoading] = useState(true);
    const [savings, setSavings] = useState();
    const [action, setAction] = useState('');
    const [toEdit, setToEdit] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        listSavings();
    }, []);

    const listSavings = async () => {
        await API.get(config.api.NAME, '/savings', null)
            .then((response) => {
                setSavings(response);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
            });
    };

    const handleEdit = (saving) => {
        setAction('update');
        setToEdit(saving);
    };

    const Form = () => {
        return (
            <>
                <StyledHeaderGrid container>
                    <Grid item sm={6} xs={12}>
                        <StyledBackButton
                            color="secondary"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => setAction('')}
                        >
                            Return to savings list
                        </StyledBackButton>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Typography variant="h4" gutterBottom>
                            {action === 'add'
                                ? 'Add a new saving'
                                : 'Edit saving'}
                        </Typography>
                    </Grid>
                </StyledHeaderGrid>
                <StyledDivider />
                {action === 'add' ? (
                    <SavingsForm action="add" />
                ) : (
                    <SavingsForm action="update" saving={toEdit} />
                )}
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
        <Page>
            {!action ? (
                <>
                    <ApplicationNavigation page="/savings" />
                    <Typography variant="h4" gutterBottom>
                        My Savings
                    </Typography>
                    <StyledDivider />
                    <ListSavings savings={savings} handleEdit={handleEdit} />
                    <StyledAddButton
                        color="secondary"
                        variant="contained"
                        size="large"
                        onClick={() => setAction('add')}
                    >
                        Add a New Saving
                    </StyledAddButton>
                </>
            ) : (
                <Form />
            )}
        </Page>
    );
};

export default Savings;
