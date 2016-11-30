process.env.UV_THREADPOOL_SIZE = 100;

var WebpackDevServer    = require("webpack-dev-server");
var webpack             = require("webpack");
var config              = require("./webpack.config.js");

var compiler            = webpack(config);

var server              = new WebpackDevServer(compiler);

var FontAwesome = require('font-awesome-loader');

server.listen(80);