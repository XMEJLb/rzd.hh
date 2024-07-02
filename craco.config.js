const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  eslint: {
    mode: 'file',
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },

    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.module.rules.push({
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        enforce: 'pre',
      });

      return webpackConfig;
    },

    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/handlers', to: 'handlers' }],
      }),
    ],
  },
};
