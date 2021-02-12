import React from 'react';
import { Container, ButtonBase, Divider } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import logo from '../../assets/logo-text.png';

const StyledLogo = styled('img')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        height: '100px',
    },
    height: '125px',
    marginTop: theme.spacing(2),
}));

const StyledHeader = styled('div')(({ theme }) => ({
    height: '300px',
    width: '100%',
    top: 0,
    background: theme.palette.info.main,
    textAlign: 'center',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    height: '3px',
    backgroundColor: theme.palette.background.default,
}));

const ApplicationHeader = () => {
    return (
        <StyledHeader>
            <Container>
                <ButtonBase component={RouterLink} to="/">
                    <StyledLogo src={logo} alt="Logo" />
                </ButtonBase>
                <StyledDivider variant="middle" />
            </Container>
        </StyledHeader>
    );
};

export default ApplicationHeader;
