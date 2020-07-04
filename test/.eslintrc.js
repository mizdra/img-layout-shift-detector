const { resolve } = require('path');

module.exports = {
  env: {
    jasmine: true,
  },
  parserOptions: {
    project: resolve(__dirname, 'tsconfig.json'),
  },
  rules: {},
};
