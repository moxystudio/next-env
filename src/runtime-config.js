'use strict';

let runtimeConfig;

export default () => runtimeConfig;

export const setConfig = (configValue) => {
    Object.keys(configValue.serverRuntimeConfig).forEach((key) => {
        process.env[key] = configValue.serverRuntimeConfig[key];
    });

    Object.keys(configValue.publicRuntimeConfig).forEach((key) => {
        process.env[key] = configValue.publicRuntimeConfig[key];
    });

    runtimeConfig = configValue;
};
