'use strict';

const path = require('path');
const webpack = require('webpack');
const poison = require('require-poisoning');

const withProcessEnv = () => (nextConfig = {}) => ({
    ...nextConfig,
    webpack: (config, options) => {
        const oldRuntimeConfig = require('next/dist/next-server/lib/runtime-config');

        console.log('old', oldRuntimeConfig);

        poison(require.resolve('next/dist/next-server/lib/runtime-config'), require('./lib/runtime-config'));

        require('next/dist/next-server/lib/runtime-config').setConfig(oldRuntimeConfig.default());

        config.resolve.alias['next/config'] = path.resolve(__dirname, 'lib/runtime-config.js');

        config.plugins.push(new webpack.NormalModuleReplacementPlugin(
            /next\/dist\/next-server\/lib\/runtime-config/,
            path.resolve(__dirname, 'lib/runtime-config.js'),
        ));

        if (typeof nextConfig.webpack === 'function') {
            return nextConfig.webpack(config, options);
        }

        return config;
    },
});

module.exports = withProcessEnv;
