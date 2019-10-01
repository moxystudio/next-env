const runtimeEnv = require('.');

const originalEnv = process.env;

afterEach(() => {
    process.env = originalEnv;
});

it('should return nextConfig with mocked variables', () => {
    process.env = {
        ...originalEnv,
        PUBLIC_TEST_FOO: 'foo',
        SERVER_TEST_BAR: 'bar',
        BUILD_TEST_ZOO: 'pet',
    };

    const plugin = runtimeEnv();
    const nextConfig = plugin();

    expect(nextConfig).toEqual({
        publicRuntimeConfig: { PUBLIC_TEST_FOO: 'foo' },
        serverRuntimeConfig: { SERVER_TEST_BAR: 'bar' },
        env: { BUILD_TEST_ZOO: 'pet' },
    });
});

it('should return nextConfig with mocked variables without prefix', () => {
    process.env = {
        ...originalEnv,
        PUBLIC_TEST_FOO: 'foo',
        SERVER_TEST_BAR: 'bar',
        BUILD_TEST_ZOO: 'pet',
    };

    const plugin = runtimeEnv({ removePrefixes: true });
    const nextConfig = plugin();

    expect(nextConfig).toEqual({
        publicRuntimeConfig: { TEST_FOO: 'foo' },
        serverRuntimeConfig: { TEST_BAR: 'bar' },
        env: { TEST_ZOO: 'pet' },
    });
});

it('should return nextConfig with mocked variables with new prefixes', () => {
    process.env = {
        ...originalEnv,
        FOO_TEST_FOO: 'foo',
        BAR_TEST_BAR: 'bar',
        ZOO_TEST_ZOO: 'pet',
    };

    const plugin = runtimeEnv({ publicPrefix: 'FOO', serverPrefix: 'BAR', buildPrefix: 'ZOO' });
    const nextConfig = plugin();

    expect(nextConfig).toEqual({
        publicRuntimeConfig: { FOO_TEST_FOO: 'foo' },
        serverRuntimeConfig: { BAR_TEST_BAR: 'bar' },
        env: { ZOO_TEST_ZOO: 'pet' },
    });
});

it('should return nextConfig with mocked variables alongside existing ones', () => {
    process.env = {
        ...originalEnv,
        PUBLIC_TEST_FOO: 'foo',
        SERVER_TEST_BAR: 'bar',
        BUILD_TEST_ZOO: 'pet',
    };

    const plugin = runtimeEnv();
    const nextConfig = plugin({
        publicRuntimeConfig: { foo: 'foo' },
        serverRuntimeConfig: { bar: 'bar' },
        env: { zoo: 'zoo' },
    });

    expect(nextConfig).toEqual({
        publicRuntimeConfig: { PUBLIC_TEST_FOO: 'foo', foo: 'foo' },
        serverRuntimeConfig: { SERVER_TEST_BAR: 'bar', bar: 'bar' },
        env: { BUILD_TEST_ZOO: 'pet', zoo: 'zoo' },
    });
});

it('should return existing nextConfig and extend it', () => {
    process.env = {
        ...originalEnv,
        PUBLIC_TEST_FOO: 'foo',
        SERVER_TEST_BAR: 'bar',
        BUILD_TEST_ZOO: 'pet',
    };

    const mockNextConfig = {
        distDir: '/foo',
    };

    const plugin = runtimeEnv();
    const nextConfig = plugin(mockNextConfig);

    expect(nextConfig).toEqual({
        ...mockNextConfig,
        publicRuntimeConfig: { PUBLIC_TEST_FOO: 'foo' },
        serverRuntimeConfig: { SERVER_TEST_BAR: 'bar' },
        env: { BUILD_TEST_ZOO: 'pet' },
    });
});

describe('when there are no environment variables', () => {
    it('should return the default values', () => {
        process.env = { };

        const plugin = runtimeEnv();
        const nextConfig = plugin();

        expect(nextConfig).toEqual({
            publicRuntimeConfig: {},
            serverRuntimeConfig: {},
            env: {},
        });
    });
});

describe('when there is only the public config defined', () => {
    it('should return the default values for the others', () => {
        process.env = { PUBLIC_TEST_FOO: 'bar' };

        const plugin = runtimeEnv();
        const nextConfig = plugin();

        expect(nextConfig).toEqual({
            publicRuntimeConfig: { PUBLIC_TEST_FOO: 'bar' },
            serverRuntimeConfig: {},
            env: {},
        });
    });
});

describe('when there is only the server config defined', () => {
    it('should return the default values for the others', () => {
        process.env = { SERVER_TEST_FOO: 'bar' };

        const plugin = runtimeEnv();
        const nextConfig = plugin();

        expect(nextConfig).toEqual({
            publicRuntimeConfig: {},
            serverRuntimeConfig: { SERVER_TEST_FOO: 'bar' },
            env: {},
        });
    });
});

describe('when there is only the build config defined', () => {
    it('should return the default values for the others', () => {
        process.env = { BUILD_TEST_FOO: 'bar' };

        const plugin = runtimeEnv();
        const nextConfig = plugin();

        expect(nextConfig).toEqual({
            publicRuntimeConfig: {},
            serverRuntimeConfig: {},
            env: { BUILD_TEST_FOO: 'bar' },
        });
    });
});
