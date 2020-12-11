import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';

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
                    <p>
                        By clicking on create account you are agreeing to
                        Bloom's{' '}
                        <a href="/terms-of-service" target="_blank">
                            Terms of Service
                        </a>
                        .
                    </p>
                    <p>
                        To learn more about how Bloom collects, uses, shares and
                        protects your personal data please read Bloom's{' '}
                        <a href="/privacy-policy" target="_blank">
                            Privacy Policy
                        </a>
                        .
                    </p>
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
