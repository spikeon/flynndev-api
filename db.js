var mysql       = require('mysql');
var config      = require('./config');

var connection  = mysql.createConnection(config.mysql);

connection.connect();

module.exports  = connection;
