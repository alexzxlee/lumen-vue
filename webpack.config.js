const path = require('path')
const { VueLoaderPlugin } = require("vue-loader")

module.exports = {
  mode: 'development',
  entry: ['./resources/app.js'],
  output: {
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'] // Regarding to the views
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }
    ]
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'resources/assets/js/components/')
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    publicPath: '/js/',
    hot: true,
    headers: {"Access-Control-Allow-Origin" : "*"}, // On development
    host: "localhost",
    port: 8081
  },
  devtool: 'source-map' // For debugging
}