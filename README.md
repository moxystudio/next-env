# next-env

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/@moxy/next-env
[downloads-image]:https://img.shields.io/npm/dm/@moxy/next-env.svg
[npm-image]:https://img.shields.io/npm/v/@moxy/next-env.svg
[travis-url]:https://travis-ci.org/moxystudio/next-env
[travis-image]:http://img.shields.io/travis/moxystudio/next-env/master.svg
[codecov-url]:https://codecov.io/gh/moxystudio/next-env
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/next-env/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/next-env
[david-dm-image]:https://img.shields.io/david/moxystudio/next-env.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/next-env?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/next-env.svg

Next.js plugin to pass environment variables to Next.js' configuration.

By default, Next.js does not make available `process.env` to the client side. The available solution for this problem is to set a config in `next.config.js` to pass values which will be available in either server and client or just server.

The way to do it is by passing values to the `publicRuntimeConfig`, `serverRuntimeConfig` and `env` properties of Next.js' config.

*More info: https://nextjs.org/docs#build-time-configuration*

This plugin does that automatically for all environment variables starting with a certain prefix.

## Installation

```sh
$ npm i --save @moxy/next-env
```

## Usage

```js
// next.config.js
const withEnv = require('@moxy/next-env');

module.exports = withEnv({ ...options })({ ...nextConfig });
```

Multiple configurations can be combined together with function composition. For example:

```js
// next.config.js
const withCSS = require('@zeit/next-css');
const withEnv = require('@moxy/next-env');

module.exports = withCSS(
    withEnv({
        removePrefixes: true,
    })({
        cssModules: true, // this options will be passed to withCSS plugin through nextConfig
    }),
);
```

Application usage:

```js
// next.config.js
const withEnv = require('@moxy/next-env');

module.exports = withEnv({ removePrefixes: true })({ ...nextConfig });
```

```sh
# environment variables definition
NEXT_PUBLIC_FOO="bar"
NEXT_SERVER_FOO="foo"
NEXT_BUILD_BAR="compile-me-please"
```

```js
// app.js
const { publicRuntimeConfig } = getConfig():

const x = publicRuntimeConfig.FOO; // 'bar'
const y = 'compile-me-please' // original code was `const y = process.env.BAR;


// server.js
const { serverRuntimeConfig } = getConfig():

const x = serverRuntimeConfig.FOO; // 'foo'
```

### Available options

| Option | Description | Type | Default |
|---|--------------------------------------------------------------------|---------|-----------|
| publicPrefix | Prefix of variables to lookup and then pass to publicRuntimeConfig | String | `NEXT_PUBLIC_` |
| serverPrefix | Prefix of variables to lookup and then pass to serverRuntimeConfig | String | `NEXT_SERVER_` |
| buildPrefix  | Prefix of variables to lookup and then pass to env to be injected in compile-time | String | `NEXT_BUILD_` |
| removePrefixes | Option to remove prefix when passing variables to config | Boolean | `false` |

## Tests

Any parameter passed to the `test` command, is passed down to Jest.

```sh
$ npm t
$ npm t -- --watch # during development
```

## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
