# next-runtime-env

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/@moxy/next-runtime-env
[downloads-image]:https://img.shields.io/npm/dm/@moxy/next-runtime-env.svg
[npm-image]:https://img.shields.io/npm/v/@moxy/next-runtime-env.svg
[travis-url]:https://travis-ci.org/moxystudio/next-runtime-env
[travis-image]:http://img.shields.io/travis/moxystudio/next-runtime-env/master.svg
[codecov-url]:https://codecov.io/gh/moxystudio/next-runtime-env
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/next-runtime-env/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/next-runtime-env
[david-dm-image]:https://img.shields.io/david/moxystudio/next-runtime-env.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/next-runtime-env?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/next-runtime-env.svg

NextJS plugin to pass environment variables to NextJS's runtime configuration.

By default, NextJS does not make available `process.env` to the client side. The available solution for this problem is to set a runtime config in `next.config.js` to pass values which will be available in either server and client or just server.

The way to do it is by passing values to the `publicRuntimeConfig` and `serverRuntimeConfig` properties of the NextJS' config.

This plugin does that automatically for all environment variables starting with a certain prefix.

## Installation

```sh
$ npm i --save-dev @moxy/next-runtime-env
```

## Usage

```js
// next.config.js
const withRuntimeEnv = require('@moxy/next-runtime-env');

module.exports = withRuntimeEnv({ ...options })({ ...nextConfig });
```

Multiple configurations can be combined together with function composition. For example:

```js
// next.config.js
const withCSS = require('@zeit/next-css');
const withRuntimeEnv = require('@moxy/next-runtime-env');

module.exports = withCSS(
    withRuntimeEnv({
        removePrefixes: true,
    })({
        cssModules: true, // this options will be passed to withCSS plugin through nextConfig
    }),
);
```

### API

| Option | Description | Type | Default |
|---|--------------------------------------------------------------------|---------|-----------|
| publicPrefix | Prefix of variables to lookup and then pass to publicRuntimeConfig | String | `PUBLIC_` |
| serverPrefix | Prefix of variables to lookup and then pass to serverRuntimeConfig | String | `SERVER_` |
| removePrefixes | Option to remove prefix when passing variables to runtime config | Boolean | `false` |

## Tests

Any parameter passed to the `test` command, is passed down to Jest.

```sh
$ npm t
$ npm t -- --coverage # to generate coverage report
$ npm t -- --watch # during development
```

## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
