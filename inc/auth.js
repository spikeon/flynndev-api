var express		= require('express');
var jwt			= require('jsonwebtoken');
var config		= require('../config/api_config');

let debug = true;

module.exports 	= {

	Init : function( req, res, next){

		var token = req.headers['x-access-token'];

		if(token) jwt.verify(token, config.secret, (err, decoded) => {
			if(err) {
				if(debug) console.log(err);
				if(debug) console.log("Token Errored");
			}
			if(debug) console.log("Token Decoded");
			if(debug) console.log(decoded);
			req.decoded = err ? false : decoded;
		});
		else {
			if(debug) console.log("No Token Sent");
			req.decoded = false;
		}

		next();
	},

	Token : function(req,res,next){
		if(debug) console.log("Checking Token");
		if(req.decoded !== false){
			if(debug) console.log("Auth Passed");
			next();
		} 
		else return res.status(403).send({success: false, message: 'No Token Provided'});

	},

	Admin : function(req, res, next){
		if(debug) console.log("Checking Admin");
		if(debug) console.log(req.decoded);
		if(req.decoded !== false && req.decoded.admin === 1) next();
		else res.sendStatus(403);
	}

}
