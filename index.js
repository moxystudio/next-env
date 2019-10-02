const buildConfig = (keys, initialConfig, prefix, { removePrefixes }) => {
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
 * @param {String} options.buildPrefix     Prefix of variables to lookup and then pass to buildRuntimeConfig
 * @param {String} options.removePrefixes   Option to remove prefix when passing variables to runtime config
 */

const runtimeEnv = (options = {}) => (nextConfig = {}) => {
    const {
        publicPrefix = 'NEXT_PUBLIC_',
        serverPrefix = 'NEXT_SERVER_',
        buildPrefix = 'NEXT_BUILD_',
        removePrefixes = false,
    } = options;

    let {
        publicRuntimeConfig = {},
        serverRuntimeConfig = {},
        env = {},
    } = nextConfig;

    const envKeys = Object.keys(process.env);

    publicRuntimeConfig = buildConfig(envKeys, publicRuntimeConfig, publicPrefix, { removePrefixes });
    serverRuntimeConfig = buildConfig(envKeys, serverRuntimeConfig, serverPrefix, { removePrefixes });
    env = buildConfig(envKeys, env, buildPrefix, { removePrefixes });

    return { ...nextConfig, publicRuntimeConfig, serverRuntimeConfig, env };
};

module.exports = runtimeEnv;
