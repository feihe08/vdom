module.exports = {
  entry: './index',
  output: {
    filename: 'bundle.js',
    path: '/',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
