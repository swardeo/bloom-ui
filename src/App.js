import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Dashboard from './pages/Dashboard';
import Savings from './pages/Savings';
import { Oops } from './pages/Errors';
import { AuthContext } from './util/auth';
import useCurrentUser from './util/useCurrentUser';
import PrivateRoute from './util/PrivateRoute';

const App = () => {
    return (
        <AuthContext.Provider value={useCurrentUser()}>
            <BrowserRouter>
                <Switch>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/terms-of-service">
                        <TermsOfService />
                    </Route>
                    <Route path="/privacy-policy">
                        <PrivacyPolicy />
                    </Route>
                    <PrivateRoute path="/dashboard">
                        <Dashboard />
                    </PrivateRoute>
                    <PrivateRoute path="/savings">
                        <Savings />
                    </PrivateRoute>
                    <PrivateRoute path="/oops">
                        <Oops />
                    </PrivateRoute>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;
