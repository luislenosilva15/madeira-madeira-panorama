const path = require('path');

module.exports = {
  entry: './src/main.js',
  mode: 'production',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: false,
    writeToDisk: true,
    // host: '192.168.2.106',
    // port: '8080',
    // disableHostCheck: true,
    // https: true
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool:'source-map'
};