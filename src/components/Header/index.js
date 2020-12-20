import React from 'react';
import BloomHeader from './Header';
import useCurrentUser from '../../util/useCurrentUser';

const Header = () => {
    const userStatus = useCurrentUser();
    const isLoggedIn = null !== userStatus;

    return isLoggedIn ? <BloomHeader authenticated={true} /> : <BloomHeader />;
};

export default Header;
