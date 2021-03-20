import React from 'react';
import { Header, Footer } from '../../components';
import { Link } from 'react-router-dom';
import config from '../../config';

const Home = () => {
    return (
        <div>
            <Header />
            <h2>Home</h2>
            <p>{'You are in the ' + config.ENVIRONMENT + ' environment.'}</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Log In</Link>
                    </li>
                </ul>
            </nav>
            <Footer />
        </div>
    );
};

export default Home;
