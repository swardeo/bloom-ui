import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './auth';

function PrivateRoute({ children, ...rest }) {
    const user = useAuth();
    const isLoggedIn = null !== user;

    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isLoggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: '/login', state: { from: location } }}
                    />
                );
            }}
        />
    );
}

export default PrivateRoute;
