import React from 'react';
import BloomHeader from './Header';
import { useAuth } from '../../util/auth';

const Header = () => {
    const user = useAuth();
    const isLoggedIn = null !== user;

    return isLoggedIn ? <BloomHeader authenticated={true} /> : <BloomHeader />;
};

export default Header;
