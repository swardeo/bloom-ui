import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Typography, Link } from '@material-ui/core';

const Authenticator = ({ initialState }) => {
    return (
        <AmplifyAuthenticator
            initialAuthState={initialState}
            usernameAlias="email"
        >
            <AmplifySignUp
                slot="sign-up"
                usernameAlias="email"
                formFields={[
                    {
                        type: 'email',
                        label: 'Email Address *',
                        placeholder: 'Enter your email address',
                        required: true,
                    },
                    {
                        type: 'password',
                        label: 'Password *',
                        placeholder: 'Enter your password',
                        required: true,
                    },
                    {
                        type: 'given_name',
                        label: 'First name *',
                        placeholder: 'Enter your first name',
                        required: true,
                    },
                ]}
            >
                <div slot="header-subtitle">
                    <Typography variant="body2" gutterBottom>
                        By clicking on create account you are agreeing to
                        Bloom's{' '}
                        <Link href="/terms-of-service" target="_blank">
                            Terms of Service
                        </Link>
                        .
                    </Typography>
                    <Typography variant="body2">
                        To learn more about how Bloom collects, uses, shares and
                        protects your personal data please read Bloom's{' '}
                        <Link href="/privacy-policy" target="_blank">
                            Privacy Policy
                        </Link>
                        .
                    </Typography>
                </div>
            </AmplifySignUp>
        </AmplifyAuthenticator>
    );
};

Authenticator.defaultProps = {
    initialState: 'signup',
};

Authenticator.propTypes = {
    initialState: PropTypes.oneOf(['signup', 'signin']),
};

export default Authenticator;
