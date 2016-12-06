var express		= require('express');
var jwt			= require('jsonwebtoken');
var config		= require('../config/api_config');

module.exports 	= {

	Init : function(req,res,next){
		var token = req.headers['x-access-token'];
		if(token) jwt.verify(token, config.secret, (err, decoded) => { req.decoded = err ? false : decoded; });
		else req.decoded = false;

		next();
	},

	Token : function(req,res,next){
		if(req.decoded !== false){
			//console.log("Auth Passed");
			next();
		} 
		else return res.status(403).send({success: false, message: 'No Token Provided'});

	},

	Admin : function(req, res, next){
		if(req.decoded !== false && req.decoded.admin === 1) next();
		else res.sendStatus(403);
	}

}
