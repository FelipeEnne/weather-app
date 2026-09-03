const path = require('path');
const webpack = require('webpack');

const apiKey = process.env.OPENWEATHER_API_KEY;

if (!apiKey) {
  throw new Error(
    'OPENWEATHER_API_KEY is required. Export it or set it in the environment before running webpack.',
  );
}

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.OPENWEATHER_API_KEY': JSON.stringify(apiKey),
    }),
  ],
};
