import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import config from './config';

const Home = () => {
    return (
        <div>
            <h2>Home</h2>
            <p>{'You are in the ' + config.ENVIRONMENT + ' environment.'}</p>
        </div>
    );
};

const About = () => <h2>About</h2>;

const Users = () => <h2>Users</h2>;

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
