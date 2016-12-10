let express 		= require('express');
let router 			= express.Router();
let config			= require('../config/api_config');
let db 				= require('../inc/db');
var sendmail        = require('sendmail')();
var validator       = require('validator');

router


	/**
	 * @api {post} /contact/send Send Contact Email
	 * @apiName ContactSend
	 * @apiGroup Contact
	 * @apiVersion 1.0.0
	 *
	 * @apiParam {String} name Name.
	 * @apiParam {String} email Email Address.
	 * @apiParam {String} content Content.
	 *
	 * @apiSuccess {Boolean} result Did Token Pass?
	 * @apiSuccessExample {json} Token Passed
	 *	HTTP/1.1 200 OK
	 *	{
	 * 		"result" : true
	 *	}
	 * @apiErrorExample {json} Bad Input
	 *	HTTP/1.1 400
	 *	{
	 * 		"error" : "Error Text",
	 * 	    "result": "false"
	 *	}
	 * @apiErrorExample {json} System Error
	 *	HTTP/1.1 500
	 *	{
	 * 		"error" : "Error Sending Mail",
	 * 	    "err"   : "Specific Error",
	 *      "stack" : "Stack trace of Specific Error",
	 * 	    "result": "false"
	 *	}
	 */
	.post('/send', function(req, res){

		let name 		= req.body.name;
		let address 	= req.body.email;
		let content 	= req.body.content;
		let result      = false;

		// Empty Validators

		if      (validator.isEmpty(name))     res.status(400).json({error: "Name Required", result});
		else if (validator.isEmpty(address))  res.status(400).json({error: "Email Required", result});
		else if (validator.isEmpty(content))  res.status(400).json({error: "Content Required", result});

		// Smarter Validators

		else if (!validator.isEmail(address)) res.status(400).json({error: "Email Invalid", result});

		else {
			sendmail({
				from:       'FlynnDev <no-reply@flynndev.us>',
				to:         'mflynn@flynndev.us',
				subject:    'New Contact Form Submission',
				replyTo:    { name, address },
				text:       content,
			}, function(err, reply) {
				if(err) {
					res.status(500).json({
						error: "Error Sending Mail",
						err,
						stack : err.stack,
						result
					});
				}
				else {
					result = true;
					res.status(200).json({result, reply});
				}
			});
		}
	});

module.exports = router;
