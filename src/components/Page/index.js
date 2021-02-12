import React from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import ApplicationHeader from '../ApplicationHeader';
import Footer from '../Footer';
import PropTypes from 'prop-types';

const StyledContainer = styled(Container)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        marginTop: '-170px',
    },
    marginTop: '-100px',
    minHeight: '45vh',
    marginBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
}));

const Page = ({ children }) => {
    return (
        <StyledBox>
            <ApplicationHeader />
            <StyledContainer maxWidth="md">{children}</StyledContainer>
            <Footer />
        </StyledBox>
    );
};

Page.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default Page;
