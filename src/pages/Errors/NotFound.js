import React, { useState } from 'react';
import { Page } from '../../components';
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

const NotFound = () => {
    const [redirect, setRedirect] = useState(false);

    if (redirect) {
        return <Redirect to="/" />;
    }
    return (
        <Page>
            <Typography variant="h4" gutterBottom>
                There doesn't seem to be anything here...
            </Typography>
            <StyledDivider />
            <Typography paragraph>
                The page you requested could not be found.
            </Typography>
            <Typography>
                Please check that you entered the correct address.
            </Typography>
            <StyledButton
                color="secondary"
                variant="contained"
                size="large"
                onClick={() => setRedirect(true)}
            >
                Return to home
            </StyledButton>
        </Page>
    );
};

export default NotFound;
