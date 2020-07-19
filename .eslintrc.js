/* eslint-env node */
module.exports = {
  root: true,
  extends: ['@mizdra/mizdra', '@mizdra/mizdra/+typescript', '@mizdra/mizdra/+prettier'],
  env: {
    es6: true,
    browser: true,
  },
  globals: {
    CSSUnitValue: 'readonly',
    CSSKeywordValue: 'readonly',
  },
  rules: {
    // 未使用変数の解析は非常にコストの掛かる作業のため、tsc に任せる
    // ref: https://github.com/typescript-eslint/typescript-eslint/issues/1856
    'no-unused-vars': 'off',
  },
};
