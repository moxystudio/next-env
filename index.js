'use strict';

const set = require('lodash/get');

const keyMappings = {
    public: 'publicRuntimeConfig',
    server: 'serverRuntimeConfig',
    build: 'env',
};

const withEnv = (vars) => (nextConfig = {}) => {
    const envConfig = vars.reduce((envConfig, env) => {
        const key = keyMappings[env.type];

        if (!key) {
            throw new Error(`Unknown environment variable type '${env.type}'`);
        }

        const value = process.env[env.name];

        set(envConfig, `${env.type}.${env.name}`, value != null ? value : env.default);

        return envConfig;
    }, {
        publicRuntimeConfig: { ...nextConfig.publicRuntimeConfig },
        serverRuntimeConfig: { ...nextConfig.serverRuntimeConfig },
        env: { ...nextConfig.env },
    });

    return {
        ...nextConfig,
        ...envConfig,
        webpack: (config, options) => {
            if (typeof nextConfig.webpack === 'function') {
                return nextConfig.webpack(config, options);
            }

            return config;
        },
    };
};

module.exports = withEnv;
