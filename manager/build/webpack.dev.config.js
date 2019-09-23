const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function (err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, 'utf-8', function (err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'Epass关务管理系统' + package.version,
            filename: '../index.html',
            inject: false
        }),
        new webpack.DefinePlugin({
            'API_BASE_URL': JSON.stringify('http://localhost:12329/'),
            'WEB_BASE_URL': JSON.stringify('http://localhost:8080'),
            'DOMAIN': JSON.stringify('locahost')
        }),
        new CopyWebpackPlugin([], {
            ignore: []
        })
    ]    
});