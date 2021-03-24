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
import { Auth } from 'aws-amplify';

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
    fontSize: theme.typography.h5.fontSize,
    padding: theme.spacing(1),
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: 'white',
    padding: `${theme.spacing(1)}px 0`,
}));

const HighlightedListItem = styled(StyledListItemText)(({ theme }) => ({
    background: theme.palette.secondary.main,
    borderRadius: theme.spacing(1),
    color: theme.palette.common.white,
    textDecorationColor: theme.palette.common.white,
}));

const StyledLogo = styled('img')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        height: '75px',
    },
    height: '90px',
}));

const renderLinks = (links) => {
    return links.map(({ title, path, type }) => (
        <Link
            key={title}
            component={RouterLink}
            to={path}
            color={type === 'highlighted' ? 'inherit' : 'primary'}
        >
            <ListItem button>
                {type === 'highlighted' ? (
                    <HighlightedListItem primary={title} disableTypography />
                ) : (
                    <StyledListItemText primary={title} disableTypography />
                )}
            </ListItem>
        </Link>
    ));
};

const renderProfileLinks = (links, authenticated) => {
    return (
        <>
            {renderLinks(links)}
            {authenticated && (
                <Link color="inherit" key="sign out">
                    <ListItem button>
                        <HighlightedListItem
                            primary="Sign Out"
                            disableTypography
                            onClick={() => signOut()}
                        />
                    </ListItem>
                </Link>
            )}
        </>
    );
};

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

const Header = ({ authenticated }) => {
    const menuLinks = [{ title: 'about', path: '/about', type: 'regular' }];

    const profileLinks = authenticated
        ? [{ title: 'my dashboard', path: '/dashboard', type: 'regular' }]
        : [
              { title: 'sign in', path: '/login', type: 'regular' },
              { title: 'register', path: '/register', type: 'highlighted' },
          ];

    return (
        <HideOnScroll>
            <StyledAppBar position="sticky">
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
