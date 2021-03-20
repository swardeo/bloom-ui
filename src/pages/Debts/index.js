import React, { useEffect, useState } from 'react';
import {
    ApplicationNavigation,
    Page,
    DebtsForm,
    ListDebts,
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

const Debts = () => {
    const [loading, setLoading] = useState(true);
    const [debts, setDebts] = useState();
    const [action, setAction] = useState('');
    const [toEdit, setToEdit] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        listDebts();
    }, []);

    const listDebts = async () => {
        await API.get(config.api.NAME, '/debts', null)
            .then((response) => {
                setDebts(response);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
            });
    };

    const handleEdit = (debt) => {
        setAction('update');
        setToEdit(debt);
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
                            Return to debts list
                        </StyledBackButton>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Typography variant="h4" gutterBottom>
                            {action === 'add' ? 'Add a new debt' : 'Edit debt'}
                        </Typography>
                    </Grid>
                </StyledHeaderGrid>
                <StyledDivider />
                {action === 'add' ? (
                    <DebtsForm action="add" />
                ) : (
                    <DebtsForm action="update" debt={toEdit} />
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
                    <ApplicationNavigation page="/debts" />
                    <Typography variant="h4" gutterBottom>
                        My debts
                    </Typography>
                    <StyledDivider />
                    <ListDebts debts={debts} handleEdit={handleEdit} />
                    <StyledAddButton
                        color="secondary"
                        variant="contained"
                        size="large"
                        onClick={() => setAction('add')}
                    >
                        Add a New Debt
                    </StyledAddButton>
                </>
            ) : (
                <Form />
            )}
        </Page>
    );
};

export default Debts;
