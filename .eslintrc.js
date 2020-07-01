module.exports = {
  root: true,
  extends: ['@mizdra/mizdra', '@mizdra/mizdra/+typescript', '@mizdra/mizdra/+prettier'],
  env: {
    es6: true,
    browser: true,
  },
  globals: {
    CSSUnitValue: 'readonly',
  },
  rules: {},
};
