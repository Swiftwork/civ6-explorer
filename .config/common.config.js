const path = require('path');
const extend = require('webpack-merge');

/* PLUGINS */
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { NoEmitOnErrorsPlugin, ContextReplacementPlugin, NamedModulesPlugin } = require('webpack');

/* POSTCSS VARIABLES */
const postcssVariablesPath = path.resolve(process.cwd(), 'src', 'styles', 'postcss.variables.js');
const postcssMediaPath = path.resolve(process.cwd(), 'src', 'styles', 'postcss.media.js');
const postcssMixinsPath = path.resolve(process.cwd(), 'src', 'styles', 'postcss.mixins.js');

function loadVariables() { return require(postcssVariablesPath); }
function loadMedia() { return require(postcssMediaPath); }
function loadMixins() { return require(postcssMixinsPath); }

const chunkOrder = ['inline', 'polyfill', 'vendor', 'main'];

const isDevServer = process.argv.find(v => v.includes('webpack-dev-server'));

const postcssLoaders = [
  {
    loader: 'css-loader',
  },
  {
    loader: 'postcss-loader', options: {
      config: {
        path: path.resolve('.config/postcss.config.js'),
        ctx: { variables: loadVariables, media: loadMedia, mixins: loadMixins },
      }
    },
  },
  {
    loader: path.resolve('.config/require-clear-loader.js'),
    options: { files: [postcssVariablesPath, postcssMediaPath, postcssMixinsPath] },
  },
];

module.exports = {
  context: path.resolve(process.cwd(), 'src'),

  entry: {
    'polyfill': './polyfill.ts',
    'main': './main.ts',
  },

  output: {
    path: path.join(process.cwd(), 'build'),
    publicPath: isDevServer ? '/' : '/wwwroot/',
    crossOriginLoading: false,
  },

  resolve: {
    modules: [
      path.resolve(process.cwd(), 'src'),
      'node_modules'
    ],
    symlinks: true,
    mainFields: [
      'browser',
      'module',
      'main',
    ],
    extensions: ['.js', '.ts'],
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]?[hash]',
        },
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(process.cwd(), 'src/styles'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: postcssLoaders,
        })
      },
      {
        test: /\.css$/,
        exclude: [
          path.resolve(process.cwd(), 'src/styles'),
        ],
        use: [
          {
            loader: 'to-string-loader',
          },
        ].concat(postcssLoaders),
      },
    ],
  },

  plugins: [
    new NoEmitOnErrorsPlugin(),
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve(process.cwd(), 'src')
    ),
    new ProgressBarPlugin(),
    new CircularDependencyPlugin({
      exclude: /(\\|\/)node_modules(\\|\/)/,
      failOnError: false
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      chunksSortMode: (left, right) => {
        let leftIndex = chunkOrder.indexOf(left.names[0]);
        let rightindex = chunkOrder.indexOf(right.names[0]);
        if (leftIndex > rightindex) return 1;
        else if (leftIndex < rightindex) return -1;
        else return 0;
      },
      xhtml: true,
    }),
    new CopyWebpackPlugin([
      { from: 'assets/data/**' },
    ]),
    new CommonsChunkPlugin({
      name: [
        'inline'
      ],
      minChunks: null
    }),
    new CommonsChunkPlugin({
      name: [
        'main'
      ],
      minChunks: 2,
      async: 'common'
    }),
  ],

  node: {
    fs: 'empty',
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },

  devServer: {
    contentBase: path.join(process.cwd(), 'build'),
    compress: true,
    host: '0.0.0.0',
    port: 9201,
    noInfo: true,
    disableHostCheck: true,
    historyApiFallback: true,
  },
};
