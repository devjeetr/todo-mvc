let config = require('./webpack.config');
let nodeExternals = require('webpack-node-externals');

config.target = 'node';
config.externals = [nodeExternals()];
module.exports = config;
