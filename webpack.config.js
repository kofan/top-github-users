const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');

function isExternal({ context }) {
  return typeof(context) === 'string'
    && context.indexOf('node_modules') !== -1;
}

const config = {
  entry: {
    main: `${SRC_DIR}/main`,
  },
  output: {
    path: DIST_DIR,
    filename: '[name]_bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: [SRC_DIR, 'node_modules'],
    alias: { 'app': SRC_DIR }
  },
  module: {
    noParse: [/\.min(\.js)?$/],
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' }
        ],
        include: [SRC_DIR],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' }, // creates style nodes from JS strings
          { loader: 'css-loader' }, // translates CSS into CommonJS (interprets @import and url() like import/require() and resolves them)
          { loader: 'sass-loader' }, // compiles SASS (SCSS) to CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader', // works like the file-loader, but can return a DataURL if the file is smaller than a byte limit
            options: {
              limit: 5120,
              name: '/images/[name]-[hash:6].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader', // optimize image
            options: {
              bypassOnDebug: true,
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
            }
          },
        ],
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader',
      },
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: isExternal
    }),

    // Enable Scope Hoisting
    // https://medium.com/webpack/brief-introduction-to-scope-hoisting-in-webpack-8435084c171f
    new webpack.optimize.ModuleConcatenationPlugin(),

    new (require('html-webpack-plugin'))({
      template: `${SRC_DIR}/index.html`,
    }),

    new (require('clean-webpack-plugin'))([`${DIST_DIR}/*.*`])
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
      },
    })
  );

  // Disable source map generation
  config.devtool = false;

  // Kill the build on failures
  config.bail = true;
}

module.exports = config;
