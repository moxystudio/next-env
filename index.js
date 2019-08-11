const buildRuntimeConfig = (keys, initialConfig, prefix, { removePrefixes }) => {
    const re = new RegExp(`^${prefix}`, 'i');

    const config = keys.reduce((acc, key) => {
        if (re.test(key)) {
            const name = removePrefixes ? key.replace(prefix, '') : key;

            return {
                ...acc,
                [name]: process.env[key],
            };
        }

        return acc;
    }, initialConfig);

    return config;
};

/**
 * NextJS plugin to pass environment variables to NextJS's runtime configuration (`publicRuntimeConfig` and `serverRuntimeConfig`)
 *
 * @param {Object} options
 * @param {String} options.publicPrefix     Prefix of variables to lookup and then pass to publicRuntimeConfig
 * @param {String} options.serverPrefix     Prefix of variables to lookup and then pass to serverRuntimeConfig
 * @param {String} options.removePrefixes   Option to remove prefix when passing variables to runtime config
 */

const runtimeEnv = (options = {}) => (nextConfig = {}) => {
    const {
        publicPrefix = 'PUBLIC_',
        serverPrefix = 'SERVER_',
        removePrefixes = false,
    } = options;

    let {
        publicRuntimeConfig = {},
        serverRuntimeConfig = {},
    } = nextConfig;

    const envKeys = Object.keys(process.env);

    publicRuntimeConfig = buildRuntimeConfig(envKeys, publicRuntimeConfig, publicPrefix, { removePrefixes });
    serverRuntimeConfig = buildRuntimeConfig(envKeys, serverRuntimeConfig, serverPrefix, { removePrefixes });

    return { ...nextConfig, publicRuntimeConfig, serverRuntimeConfig };
};

module.exports = runtimeEnv;
