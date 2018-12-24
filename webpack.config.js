const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


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
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'API_URL': JSON.stringify(process.env.API_URL)
            } 
        })
    )
} else {
    console.log('else')
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify("http://localhost:3000")
        })
    )
}

module.exports = config;