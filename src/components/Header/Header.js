import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Container,
    Toolbar,
    ButtonBase,
    List,
    Link,
    ListItem,
    ListItemText,
    Hidden,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import HideOnScroll from './HideOnScroll';
import { Menu, PersonOutline } from '@material-ui/icons';
import Drawer from './Drawer';
import logo from '../../assets/logo-text.png';
import { AmplifySignOut } from '@aws-amplify/ui-react';

const StyledContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const StyledNav = styled(List)({
    display: 'flex',
    justifyContent: 'space-evenly',
});

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    textDecoration: 'none',
    textTransform: 'capitalize',
    fontSize: theme.typography.h4.fontSize,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: 'white',
    padding: theme.spacing(2),
}));

const StyledAmplifySignOut = styled(AmplifySignOut)({
    width: '100%',
});

const StyledLogo = styled('img')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        height: '75px',
    },
    height: '100px',
}));

const renderLinks = (links) => {
    return links.map(({ title, path }) => (
        <Link key={title} component={RouterLink} to={path}>
            <ListItem button>
                <StyledListItemText primary={title} disableTypography />
            </ListItem>
        </Link>
    ));
};

const renderProfileLinks = (links, authenticated) => {
    return (
        <>
            {renderLinks(links)}
            {authenticated && (
                <Link key="sign out">
                    <ListItem button>
                        <StyledAmplifySignOut />
                    </ListItem>
                </Link>
            )}
        </>
    );
};

const Header = ({ authenticated }) => {
    const menuLinks = [
        { title: 'why bloom?', path: '/why-bloom' },
        { title: 'about', path: '/about' },
    ];

    const profileLinks = authenticated
        ? [{ title: 'my dashboard', path: '/dashboard' }]
        : [
              { title: 'sign in', path: '/login' },
              { title: 'register', path: '/register' },
          ];

    return (
        <HideOnScroll>
            <StyledAppBar position="fixed">
                <Toolbar>
                    <StyledContainer maxWidth="md">
                        <Hidden mdUp>
                            <Drawer
                                Icon={Menu}
                                openFrom="left"
                                links={renderLinks(menuLinks)}
                            />
                        </Hidden>
                        <ButtonBase focusRipple component={RouterLink} to="/">
                            <StyledLogo src={logo} alt="Logo" />
                        </ButtonBase>
                        <Hidden smDown>
                            <StyledNav
                                component="nav"
                                aria-labelledby="menu navigation"
                            >
                                {renderLinks(menuLinks)}
                                {renderProfileLinks(
                                    profileLinks,
                                    authenticated
                                )}
                            </StyledNav>
                        </Hidden>
                        <Hidden mdUp>
                            <Drawer
                                Icon={PersonOutline}
                                openFrom="right"
                                links={renderProfileLinks(
                                    profileLinks,
                                    authenticated
                                )}
                            />
                        </Hidden>
                    </StyledContainer>
                </Toolbar>
            </StyledAppBar>
        </HideOnScroll>
    );
};

Header.defaultProps = {
    authenticated: false,
};

Header.propTypes = {
    authenticated: PropTypes.bool,
};

export default Header;
