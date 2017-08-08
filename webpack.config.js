var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    watch: true,

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    devServer: {
        inline: true,
        port: 8081,
        publicPath: '/',
        contentBase: './public',
        historyApiFallback: true
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
}