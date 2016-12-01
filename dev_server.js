process.env.UV_THREADPOOL_SIZE = 100;

var WebpackDevServer    = require("webpack-dev-server");
var webpack             = require("webpack");
var config              = require("./config/webpack.dev");
var express             = require("express");
var compiler            = webpack(config);
var path                = require("path");

var server              = new WebpackDevServer(compiler, {
	historyApiFallback: true,
	setup : function(app){
		app.use('/projects', express.static('/var/projects'));
		app.use('/api', express.static(path.join(__dirname , 'api')));
	}
});

server.listen(8080);