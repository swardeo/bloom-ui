import React from 'react';
import {
    Container,
    Divider,
    Grid,
    Link,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import logo from '../../assets/logo-no-text.png';

const StyledFooter = styled('footer')(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    textAlign: 'center',
    clear: 'both',
    background: theme.palette.primary.main,
    boxShadow: `0 50vh 0 50vh ${theme.palette.primary.main}`,
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.common.white,
    fontSize: theme.typography.subtitle1.fontSize,
}));

const StyledText = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
    width: '70%',
    margin: `${theme.spacing(1)}px auto`,
    color: theme.palette.common.white,
}));

const StyledLogo = styled('img')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        height: '50px',
    },
    height: '75px',
    background: theme.palette.background.default,
    border: `3px solid ${theme.palette.secondary.main}`,
    borderRadius: '20px',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
}));

const renderLinks = (links) => {
    return links.map(({ title, path }) => (
        <Link key={title} component={RouterLink} to={path}>
            <ListItem button dense>
                <StyledListItemText primary={title} disableTypography />
            </ListItem>
        </Link>
    ));
};

const Footer = () => {
    const firstColumnLinks = [
        { title: 'Examples', path: '/examples' },
        { title: 'About', path: '/about' },
        { title: 'FAQs', path: '/faq' },
    ];

    const secondColumnLinks = [
        { title: 'Privacy Policy', path: '/privacy-policy' },
        { title: 'Terms of Service', path: '/terms-of-service' },
    ];

    return (
        <StyledFooter>
            <Container maxWidth="md">
                <Grid container justify="space-evenly">
                    <Grid item md={6} xs={12}>
                        <StyledText variant="body1">
                            Bloom has been created by Sam Ward for his Final
                            Year Project at Aston University.
                        </StyledText>
                        <StyledLogo src={logo} alt="Logo" />
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <List aria-labelledby="about bloom">
                            {renderLinks(firstColumnLinks)}
                        </List>
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <List aria-labelledby="bloom compliance">
                            {renderLinks(secondColumnLinks)}
                        </List>
                    </Grid>
                </Grid>
                <StyledDivider variant="middle" />
                <Container>
                    <StyledText variant="body2">
                        &#169; Bloom {new Date().getFullYear()}
                    </StyledText>
                </Container>
            </Container>
        </StyledFooter>
    );
};

export default Footer;
