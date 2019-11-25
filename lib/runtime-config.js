'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setConfig = exports.default = void 0;
let runtimeConfig;

var _default = () => runtimeConfig;

exports.default = _default;

const setConfig = configValue => {
  Object.keys(configValue.serverRuntimeConfig).forEach(key => {
    process.env[key] = configValue.serverRuntimeConfig[key];
  });
  Object.keys(configValue.publicRuntimeConfig).forEach(key => {
    process.env[key] = configValue.publicRuntimeConfig[key];
  });
  runtimeConfig = configValue;
};

exports.setConfig = setConfig;