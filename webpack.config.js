module.exports = {
  entry: './index',
  output: {
    filename: 'bundle.js',
    path: './'
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
