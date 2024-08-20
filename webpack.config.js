const path = require('path');
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");


module.exports = {
    entry: slsw.lib.entries,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    externals: [nodeExternals()],
    optimization: {
        minimize: false,
    },
    performance: {
        hints: false,
    },
    devtool: "source-map",
};