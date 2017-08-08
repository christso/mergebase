var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    watch: true,
    
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },

    devServer: {
        inline: true,
        port: 8080
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