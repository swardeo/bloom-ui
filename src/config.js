const local = {
    ENVIRONMENT: 'local',
    cognito: {
        REGION: 'eu-west-2',
        USER_POOL_ID: 'eu-west-2_kllq2A0rg',
        APP_CLIENT_ID: '1kqpo5p2da2kmcc2dcnk5dnmu',
        IDENTITY_POOL_ID: 'eu-west-2:b7b31a8e-6aa7-4fca-b63d-4e4c7bdd4aa4',
    },
};

const development = {
    ENVIRONMENT: 'development',
    cognito: {
        REGION: 'eu-west-2',
        USER_POOL_ID: 'eu-west-2_kllq2A0rg',
        APP_CLIENT_ID: '1kqpo5p2da2kmcc2dcnk5dnmu',
        IDENTITY_POOL_ID: 'eu-west-2:b7b31a8e-6aa7-4fca-b63d-4e4c7bdd4aa4',
    },
};

const production = {
    ENVIRONMENT: 'production',
    cognito: {
        REGION: 'eu-west-2',
        USER_POOL_ID: 'eu-west-2_4gXJn76To',
        APP_CLIENT_ID: '6cnu56vrpivgjop1g2c1hgrvca',
        IDENTITY_POOL_ID: 'eu-west-2:dd63520c-cd5e-41e4-abaa-76a041e9c55b',
    },
};

const getConfig = {
    development: development,
    production: production,
};

const config =
    process.env.REACT_APP_STAGE === 'production' ||
    process.env.REACT_APP_STAGE === 'development'
        ? getConfig[process.env.REACT_APP_STAGE]
        : local;

export default config;
