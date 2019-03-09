const path = require('path');

module.exports = {
    entry: './src/web/index.js',
    output: {
        path: path.resolve(__dirname, 'publish'),
        filename: 'bundle.js'
    } ,
    mode:"development",
    devtool : 'source-map',
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      }
  };