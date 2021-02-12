import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './auth';

function PrivateRoute({ children, ...rest }) {
    const user = useAuth();
    const isLoggedIn = null !== user;

    return (
        <Route
            {...rest}
            render={() => {
                return isLoggedIn ? children : <Redirect to="/login" />;
            }}
        />
    );
}

export default PrivateRoute;
