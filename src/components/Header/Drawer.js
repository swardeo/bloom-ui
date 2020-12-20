import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, IconButton, Drawer } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const StyledList = styled('div')({
    width: 250,
});

const SideDrawer = ({ Icon, openFrom, links }) => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const SideDrawerList = () => (
        <StyledList
            role="presentation"
            onClick={handleDrawerClose}
            onKeyDown={handleDrawerClose}
        >
            <List component="nav">{links}</List>
        </StyledList>
    );

    return (
        <>
            <IconButton
                color="primary"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
            >
                <Icon fontSize="large" />
            </IconButton>
            <Drawer anchor={openFrom} open={open} onClose={handleDrawerClose}>
                {SideDrawerList(openFrom)}
            </Drawer>
        </>
    );
};

SideDrawer.propTypes = {
    Icon: PropTypes.elementType.isRequired,
    openFrom: PropTypes.oneOf(['left', 'right']).isRequired,
    links: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default SideDrawer;
