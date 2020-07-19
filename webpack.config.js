/* eslint-env node */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = resolve(__dirname, '.');
const srcPath = resolve(__dirname, './src');
const distPath = resolve(__dirname, './dist');

/** @type import('webpack').ConfigurationFactory */
module.exports = (env, argv) => ({
  entry: {
    background: [resolve(srcPath, './background/background.ts')],
    content: [resolve(srcPath, './content/content.ts')],
  },
  output: {
    path: distPath,
    filename: 'js/[name].js',
  },
  devtool: 'inline-source-map',

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

  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve(distPath, './index.html'),
      template: resolve(rootPath, 'index.html'),
      chunks: ['content'],
      scriptLoading: 'defer',
    }),
  ],
});
