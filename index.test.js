const runtimeEnv = require('.');

const originalEnv = process.env;

afterEach(() => {
    process.env = originalEnv;
});

it('should return nextConfig with mocked variables', () => {
    process.env = {
        ...originalEnv,
        NEXT_PUBLIC_TEST_FOO: 'foo',
        NEXT_SERVER_TEST_BAR: 'bar',
        NEXT_BUILD_TEST_ZOO: 'pet',
    };

    const plugin = runtimeEnv();
    const nextConfig = plugin();

    expect(nextConfig).toEqual({
        publicRuntimeConfig: { NEXT_PUBLIC_TEST_FOO: 'foo' },
        serverRuntimeConfig: { NEXT_SERVER_TEST_BAR: 'bar' },
        env: { NEXT_BUILD_TEST_ZOO: 'pet' },
    });
});

it('should return nextConfig with mocked variables without prefix', () => {
    process.env = {
        ...originalEnv,
        NEXT_PUBLIC_TEST_FOO: 'foo',
        NEXT_SERVER_TEST_BAR: 'bar',
        NEXT_BUILD_TEST_ZOO: 'pet',
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
        NEXT_PUBLIC_TEST_FOO: 'foo',
        NEXT_SERVER_TEST_BAR: 'bar',
        NEXT_BUILD_TEST_ZOO: 'pet',
    };

    const plugin = runtimeEnv();
    const nextConfig = plugin({
        publicRuntimeConfig: { foo: 'foo' },
        serverRuntimeConfig: { bar: 'bar' },
        env: { zoo: 'zoo' },
    });

    expect(nextConfig).toEqual({
        publicRuntimeConfig: { NEXT_PUBLIC_TEST_FOO: 'foo', foo: 'foo' },
        serverRuntimeConfig: { NEXT_SERVER_TEST_BAR: 'bar', bar: 'bar' },
        env: { NEXT_BUILD_TEST_ZOO: 'pet', zoo: 'zoo' },
    });
});

it('should return existing nextConfig and extend it', () => {
    process.env = {
        ...originalEnv,
        NEXT_PUBLIC_TEST_FOO: 'foo',
        NEXT_SERVER_TEST_BAR: 'bar',
        NEXT_BUILD_TEST_ZOO: 'pet',
    };

    const mockNextConfig = {
        distDir: '/foo',
    };

    const plugin = runtimeEnv();
    const nextConfig = plugin(mockNextConfig);

    expect(nextConfig).toEqual({
        ...mockNextConfig,
        publicRuntimeConfig: { NEXT_PUBLIC_TEST_FOO: 'foo' },
        serverRuntimeConfig: { NEXT_SERVER_TEST_BAR: 'bar' },
        env: { NEXT_BUILD_TEST_ZOO: 'pet' },
    });
});

it('should return the default values when there are no environment variables', () => {
    process.env = { };

    const plugin = runtimeEnv();
    const nextConfig = plugin();

    expect(nextConfig).toEqual({
        publicRuntimeConfig: {},
        serverRuntimeConfig: {},
        env: {},
    });
});

it('should return the default values for the others when there is only the public config defined', () => {
    process.env = { NEXT_PUBLIC_TEST_FOO: 'bar' };

    const plugin = runtimeEnv();
    const nextConfig = plugin();

    expect(nextConfig).toEqual({
        publicRuntimeConfig: { NEXT_PUBLIC_TEST_FOO: 'bar' },
        serverRuntimeConfig: {},
        env: {},
    });
});

it('should return the default values for the others when there is only the server config defined', () => {
    process.env = { NEXT_SERVER_TEST_FOO: 'bar' };

    const plugin = runtimeEnv();
    const nextConfig = plugin();

    expect(nextConfig).toEqual({
        publicRuntimeConfig: {},
        serverRuntimeConfig: { NEXT_SERVER_TEST_FOO: 'bar' },
        env: {},
    });
});

it('should return the default values for the others when there is only the build config defined', () => {
    process.env = { NEXT_BUILD_TEST_FOO: 'bar' };

    const plugin = runtimeEnv();
    const nextConfig = plugin();

    expect(nextConfig).toEqual({
        publicRuntimeConfig: {},
        serverRuntimeConfig: {},
        env: { NEXT_BUILD_TEST_FOO: 'bar' },
    });
});
