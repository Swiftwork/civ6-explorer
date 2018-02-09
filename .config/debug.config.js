const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

/* PLUGINS */
// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { LoaderOptionsPlugin, EnvironmentPlugin, HotModuleReplacementPlugin, NamedModulesPlugin, SourceMapDevToolPlugin } = require('webpack');
const { NamedLazyChunksWebpackPlugin } = require('@angular/cli/plugins/webpack');

/* NODE_MODULES */
const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');

/* Import common configuration for debug and dist */
const commonConfig = require('./common.config.js');

module.exports = merge.smart(commonConfig, {

  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              silent: true,
              configFileName: path.resolve(process.cwd(), 'src', 'tsconfig.app.json'),
            },
          },
          'angular2-template-loader',
        ],
      },
    ],
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new NamedLazyChunksWebpackPlugin(),
    new CheckerPlugin(),
    new ExtractTextPlugin({
      disable: true,
    }),
    new CommonsChunkPlugin({
      name: [
        'vendor'
      ],
      minChunks: (module) => module.resource && (
        module.resource.startsWith(nodeModules) ||
        module.resource.startsWith(realNodeModules) ||
        module.resource.startsWith(genDirNodeModules)
      ),
      chunks: [
        'main'
      ]
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map[query]',
      moduleFilenameTemplate: '[resource-path]',
      fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
      sourceRoot: 'webpack:///'
    }),
    new LoaderOptionsPlugin({
      debug: true,
      options: {
        styleLoader: {
          sourceMap: true,
        },
        cssLoader: {
          sourceMap: true,
        },
        postcssLoader: {
          sourceMap: true,
        },
      },
    }),
    new EnvironmentPlugin({
      NODE_ENV: "development"
    }),
  ],

  devServer: {
    hot: true,
  }
});
