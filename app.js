process.env.UV_THREADPOOL_SIZE = 100;


var WebpackDevServer    = require("webpack-dev-server");
var webpack             = require("webpack");
var config              = require("./webpack.config.js");

//config.entry.app.unshift("webpack-dev-server/client?http://localhost:8090/");

var compiler = webpack(config);

var server = new WebpackDevServer(compiler);

server.listen(8090);