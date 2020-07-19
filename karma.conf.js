/* eslint-env node */
module.exports = (config) => {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: ['src/**/*.ts', 'test/**/*.ts'],
    preprocessors: {
      '**/*.ts': 'karma-typescript',
    },
    reporters: ['progress', 'karma-typescript'],
    browsers: ['ChromeHeadless'],
    karmaTypescriptConfig: {
      compilerOptions: {
        sourceMap: true,
      },
      bundlerOptions: {
        entrypoints: /\.test\.ts$/,
      },
    },
  });
};
