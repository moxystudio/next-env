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

const withEnv = (options = {}) => (nextConfig = {}) => {
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

module.exports = withEnv;
