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
    };

    const plugin = runtimeEnv();
    const nextConfig = plugin();

    expect(nextConfig).toMatchObject({
        publicRuntimeConfig: { PUBLIC_TEST_FOO: 'foo' },
        serverRuntimeConfig: { SERVER_TEST_BAR: 'bar' },
    });
});

it('should return nextConfig with mocked variables without prefix', () => {
    process.env = {
        ...originalEnv,
        PUBLIC_TEST_FOO: 'foo',
        SERVER_TEST_BAR: 'bar',
    };

    const plugin = runtimeEnv({ removePrefixes: true });
    const nextConfig = plugin();

    expect(nextConfig).toMatchObject({
        publicRuntimeConfig: { TEST_FOO: 'foo' },
        serverRuntimeConfig: { TEST_BAR: 'bar' },
    });
});

it('should return nextConfig with mocked variables with new prefixes', () => {
    process.env = {
        ...originalEnv,
        FOO_TEST_FOO: 'foo',
        BAR_TEST_BAR: 'bar',
    };

    const plugin = runtimeEnv({ publicPrefix: 'FOO', serverPrefix: 'BAR' });
    const nextConfig = plugin();

    expect(nextConfig).toMatchObject({
        publicRuntimeConfig: { FOO_TEST_FOO: 'foo' },
        serverRuntimeConfig: { BAR_TEST_BAR: 'bar' },
    });
});

it('should return nextConfig with mocked variables alongside existing ones', () => {
    process.env = {
        ...originalEnv,
        PUBLIC_TEST_FOO: 'foo',
        SERVER_TEST_BAR: 'bar',
    };

    const plugin = runtimeEnv();
    const nextConfig = plugin({
        publicRuntimeConfig: { foo: 'foo' },
        serverRuntimeConfig: { bar: 'bar' },
    });

    expect(nextConfig).toMatchObject({
        publicRuntimeConfig: { PUBLIC_TEST_FOO: 'foo', foo: 'foo' },
        serverRuntimeConfig: { SERVER_TEST_BAR: 'bar', bar: 'bar' },
    });
});

it('should return extend existing nextConfig', () => {
    process.env = {
        ...originalEnv,
        PUBLIC_TEST_FOO: 'foo',
        SERVER_TEST_BAR: 'bar',
    };

    const mockNextConfig = {
        distDir: '/foo',
    };

    const plugin = runtimeEnv();
    const nextConfig = plugin(mockNextConfig);

    expect(nextConfig).toMatchObject({
        publicRuntimeConfig: { PUBLIC_TEST_FOO: 'foo' },
        serverRuntimeConfig: { SERVER_TEST_BAR: 'bar' },
        ...mockNextConfig,
    });
});
