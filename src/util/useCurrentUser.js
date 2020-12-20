import { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';

function useCurrentUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const updateUser = async () => {
            try {
                let user = await Auth.currentAuthenticatedUser();
                setUser(user);
            } catch {
                setUser(null);
            }
        };
        Hub.listen('auth', updateUser);
        updateUser();
    }, []);

    return user;
}

export default useCurrentUser;
