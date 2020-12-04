const local = {
    ENVIRONMENT: 'local',
};

const development = {
    ENVIRONMENT: 'development',
};

const production = {
    ENVIRONMENT: 'production',
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
