import { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';

const getCurrentUser = async () => {
    try {
        return await Auth.currentAuthenticatedUser();
    } catch {
        return null;
    }
};

const useCurrentUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const updateUser = async () => {
            setUser(await getCurrentUser());
        };
        Hub.listen('auth', updateUser);
        updateUser();
        return () => Hub.remove('auth', updateUser);
    }, []);

    return user;
};

export default useCurrentUser;
