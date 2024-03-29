import React from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { ApplicationHeader, Footer } from '../';
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

const Page = ({ maxWidth, children }) => {
    return (
        <StyledBox>
            <ApplicationHeader />
            <StyledContainer maxWidth={maxWidth}>{children}</StyledContainer>
            <Footer />
        </StyledBox>
    );
};

Page.defaultProps = {
    maxWidth: 'md',
};

Page.propTypes = {
    maxWidth: PropTypes.oneOf(['md', 'lg']),
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default Page;
