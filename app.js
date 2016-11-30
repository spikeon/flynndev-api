process.env.UV_THREADPOOL_SIZE = 100;

var WebpackDevServer    = require("webpack-dev-server");
var webpack             = require("webpack");
var config              = require("./webpack.config.js");
var express             = require("express");
var proxy = require('proxy-middleware');
var url = require('url');

var compiler            = webpack(config);

var server              = new WebpackDevServer(compiler);

var app = express();
app.use('/assets', proxy(url.parse('http://localhost:8081/assets')));
app.get('/*', function(req, res) { res.sendFile(__dirname + '/app/index.html'); });

server.listen(8081);
app.listen(80);