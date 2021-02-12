import React, { useState } from 'react';
import Page from '../../components/Page';
import { styled } from '@material-ui/core/styles';
import { Button, Divider, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const StyledDivider = styled(Divider)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
}));

const Oops = () => {
    const [redirect, setRedirect] = useState(false);

    if (redirect) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <Page>
            <Typography variant="h4" gutterBottom>
                Oops... something went wrong
            </Typography>
            <StyledDivider />
            <Typography>
                Please get in contact if this problem continues.
            </Typography>
            <StyledButton
                color="secondary"
                variant="contained"
                size="large"
                onClick={() => setRedirect(true)}
            >
                Return to dashboard
            </StyledButton>
        </Page>
    );
};

export default Oops;
