const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    'service-worker': path.resolve(__dirname, 'src/service-worker.js'),
    'content-scripts/button-injector': path.resolve(__dirname, 'src/content-scripts/button-injector.js'),
    'content-scripts/add-extension-id': path.resolve(__dirname, 'src/content-scripts/add-extension-id.js'),
    'options-page/app': path.resolve(__dirname, 'src/options-page/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' },
        { from: 'src/options-page/index.html', to: 'options-page/index.html' },
        { from: 'src/assets/icons', to: 'icons' },
      ]
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.jsx$/, // Process both .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules from transpilation
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', // Transpile modern JS
              ['@babel/preset-react', { runtime: 'automatic' }], // Transpile JSX
            ],
          },
        },
      },
      {
        test: /\.css$/, // Handle CSS files (including TailwindCSS)
        use: [
          MiniCssExtractPlugin.loader, // Loops through CSS files and extracts them
          // 'style-loader',  // Inject CSS into the DOM (disabled while using MiniCssExtractPlugin)
          'css-loader', // Translates CSS into CommonJS
          'postcss-loader', // Process Tailwind CSS with PostCSS
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.svg'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
};
