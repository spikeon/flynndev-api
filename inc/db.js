var mysql       = require('mysql');
var config      = require('./../config/api_config');

var connection  = mysql.createConnection(config.mysql);

connection.connect();

module.exports  = connection;
