process.env.UV_THREADPOOL_SIZE = 100;

var WebpackDevServer    = require("webpack-dev-server");
var webpack             = require("webpack");
var config              = require("./webpack.config.js");

var compiler            = webpack(config);

var server              = new WebpackDevServer(compiler, {
	historyApiFallback: true,
	setup : function(app){
		app.use('/projects', express.static('/var/www/projects/'));
	}
});

server.listen(80);