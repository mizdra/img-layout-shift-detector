module.exports = (config) => {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: ['test/**/*.ts'],
    preprocessors: {
      '**/*.ts': 'karma-typescript',
    },
    reporters: ['progress', 'karma-typescript'],
    browsers: ['ChromeHeadless'],
  });
};
