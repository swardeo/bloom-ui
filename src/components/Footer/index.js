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
    position: 'absolute',
    textAlign: 'center',
    bottom: 0,
    width: '100%',
    background: theme.palette.primary.main,
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: theme.typography.subtitle1.fontSize,
}));

const StyledText = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
    width: '70%',
    margin: `${theme.spacing(1)}px auto`,
}));

const StyledLogo = styled('img')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        height: '50px',
    },
    height: '75px',
    background: theme.palette.text.secondary,
    border: `3px solid ${theme.palette.secondary.main}`,
    borderRadius: '20px',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.text.secondary,
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
        { title: 'Why Bloom?', path: '/why-bloom' },
        { title: 'About', path: '/about' },
        { title: 'FAQ', path: '/faq' },
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
                        <StyledText variant="body1" color="textSecondary">
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
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                    >
                        &#169; Bloom {new Date().getFullYear()}
                    </Typography>
                </Container>
            </Container>
        </StyledFooter>
    );
};

export default Footer;
