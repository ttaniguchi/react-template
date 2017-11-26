const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ZipWebpackPlugin = require('zip-webpack-plugin');
const gitRevision = new GitRevisionPlugin();
const moment = require('moment');
const isDebug = (process.env.NODE_ENV === 'development');

const PROJECT_NAME = 'react-template';

/**
 * 共通設定
 */
const common = {
  cache: true,
  context: __dirname,
  entry: {
    bundle: './jsx/index.jsx',
  },
  output: {
    filename: './[name].[git-revision-version].js',
    path: `${__dirname}/dist/${PROJECT_NAME}`,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          `css-loader?minimize=${!isDebug}`,
        ],
      }, {
        test: /\.jsx$/,
        use: 'eslint-loader',
        enforce: 'pre',
      }, {
        test: /\.jsx$/,
        use: 'babel-loader',
        include: /jsx/,
      },
    ],
  },
  plugins: [
    gitRevision,
    new HtmlWebpackPlugin({
      chunks: ['jsx'],
      hash: false,
      filename: `${PROJECT_NAME}/index.html`,
      filename: 'index.html',
      template: './src/index.html',
      title: (isDebug) ? `${PROJECT_NAME} (${process.env.NODE_ENV})` : PROJECT_NAME,
      version: gitRevision.version(),
      deployTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      deployCodes: `https://github.com/ttaniguchi/${PROJECT_NAME}/commit/${gitRevision.commithash()}`,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: './.eslintrc',
        },
      },
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};

/**
 * ビルド時固有設定
 * - production
 *   - JS圧縮
 */
if (isDebug) {
  module.exports = common;
} else {
  module.exports = merge(common, {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress:{
          warnings: false,
        },
      }),
      new ZipWebpackPlugin({
        path: './../',
        filename: 'dist.zip',
        pathPrefix: 'dist',
      }),
    ]
  });
}
