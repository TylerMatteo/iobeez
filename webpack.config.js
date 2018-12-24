var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');


const config = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
      },
      module: {
        rules: [
          { 
              test: /\.(js)$/, use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['react', 'env'],
                      plugins: ['transform-object-rest-spread']
                  }
                } 
          },
          { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ]}
        ]
      },
      devServer: {
          historyApiFallback: true
      },
      plugins: [
          new HtmlWebpackPlugin({
              template: 'app/index.html'
          })
      ],
      mode: "development"
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            } 
        })
    )
}

module.exports = config;