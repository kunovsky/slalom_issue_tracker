var path = require('path');
var pkg = require('../package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var DEBUG = process.env.NODE_ENV === 'development';
var TEST = process.env.NODE_ENV === 'test';

var sassLoader;
var cssLoader;
var fileLoader = 'file-loader?name=[path][name].[ext]';
var htmlLoader = [
  'file-loader?name=[path][name].[ext]',
  'template-html-loader?' + [
    'raw=true',
    'engine=lodash',
    'version=' + pkg.version,
    'title=' + pkg.name,
    'debug=' + DEBUG
  ].join('&')
].join('!');
var jsonLoader = ['json-loader'];

var sassParams = [
  'outputStyle=expanded',
  'includePaths[]=' + path.resolve(__dirname, '../app/scss'),
  'includePaths[]=' + path.resolve(__dirname, '../node_modules'),
  'includePaths[]=' + path.resolve(__dirname, '../bower_components/foundation/scss')
];

if (DEBUG || TEST) {
  sassParams.push('sourceMap', 'sourceMapContents=true');
  sassLoader = [
    'style-loader',
    'css-loader?sourceMap',
    'postcss-loader',
    'sass-loader?' + sassParams.join('&')
  ].join('!');
  cssLoader = [
    'style-loader',
    'css-loader?sourceMap',
    'postcss-loader'
  ].join('!');
} else {
  sassLoader = ExtractTextPlugin.extract('style-loader', [
    'css-loader',
    'postcss-loader',
    'sass-loader?' + sassParams.join('&')
  ].join('!'));
  cssLoader = ExtractTextPlugin.extract('style-loader', [
    'css-loader',
    'postcss-loader'
  ].join('!'));
}

var loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader?optional=runtime']
  },
  {
    test: /\.css$/,
    loader: cssLoader
  },
  { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff'
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$/,
    loader: fileLoader
  },
  {
    test: /\.json$/,
    exclude: /node_modules/,
    loaders: jsonLoader
  },
  {
    test: /\.html$/,
    loader: htmlLoader
  },
  {
    test: /\.scss$/,
    loader: sassLoader
  }
];

module.exports = loaders;
