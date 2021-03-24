import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
    About,
    Dashboard,
    Debts,
    Oops,
    Faq,
    Home,
    Login,
    PrivacyPolicy,
    Register,
    Savings,
    TermsOfService,
    NotFound,
} from './pages';
import { AuthContext } from './util/auth';
import useCurrentUser from './util/useCurrentUser';
import PrivateRoute from './util/PrivateRoute';

const App = () => {
    return (
        <AuthContext.Provider value={useCurrentUser()}>
            <BrowserRouter>
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
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
                    <Route path="/faq/:id?">
                        <Faq />
                    </Route>
                    <PrivateRoute path="/dashboard">
                        <Dashboard />
                    </PrivateRoute>
                    <PrivateRoute path="/savings">
                        <Savings />
                    </PrivateRoute>
                    <PrivateRoute path="/debts">
                        <Debts />
                    </PrivateRoute>
                    <PrivateRoute path="/oops">
                        <Oops />
                    </PrivateRoute>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;
