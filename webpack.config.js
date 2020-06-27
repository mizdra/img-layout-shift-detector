const { resolve } = require('path');

const rootPath = resolve(__dirname, '.');
const srcPath = resolve(__dirname, './src');
const distPath = resolve(__dirname, './dist');

/** @type import('webpack').ConfigurationFactory */
module.exports = (env, argv) => ({
  entry: {
    popup: [resolve(srcPath, './popup.ts')],
  },
  output: {
    path: distPath,
    filename: 'js/[name].js',
  },
  devtool: argv.mode === 'development' ? 'inline-source-map' : false,

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
});
