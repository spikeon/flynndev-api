var express		= require('express');
var jwt			= require('jsonwebtoken');
var config		= require('./../config/api_config');

module.exports 	= {

	Init : function(req,res,next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if(token){
			jwt.verify(token, config.secret, function(err, decoded){
				if(err) req.decoded = false;
				else{
					console.log("Token Decoded");
					req.decoded = decoded;
					console.log(decoded);
					next();
				}
			});
		} else {
			req.decoded = false;
			console.log("No Token");
			next();
		}
	},

	Token : function(req,res,next){
		if(req.decoded !== false){
			console.log("Auth Passed");
			next();
		} 
		else return res.status(403).send({success: false, message: 'No Token Provided'});

	},

	Admin : function(req, res, next){
		if(req.decoded !== false && req.decoded.admin === 1) next();
		else res.sendStatus(403);
	}

}
