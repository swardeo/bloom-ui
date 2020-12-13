import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

const App = () => {
    return (
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
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
