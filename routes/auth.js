let express 		= require('express');
let router 			= express.Router();
let jwt				= require('jsonwebtoken');
let config			= require('../config/api_config');
let db 				= require('../inc/db');

router

	/**
	 * @api {post} /auth Request Auth Token
	 * @apiName Authentication
	 * @apiGroup Authentication
	 * @apiVersion 1.0.0
	 *
	 * @apiParam {String} username Users username.
	 * @apiParam {String} password Users password.
	 *
	 * @apiSuccess {String} token JWT token.
	 * @apiSuccess {Object} user User Object.
	 * @apiSuccessExample {json} Success
	 *	HTTP/1.1 200 OK
	 *	{
	 * 		"token" : "JWT-TOKEN-STRING"
	 *		"user" : {
	 *			"id" : 1
	 *			"name" : "joe"
	 *			"username" : "joe234",
	 *			"password" : NULL,
	 *
	 *		}
	 *	}
	 * @apiErrorExample {json} Error 404
	 *		HTTP/1.1 404 Not Found
	 */

	.post('/', function(req, res){

		let username = req.body.username;
		let password = req.body.password;

		db.query("SELECT * FROM users WHERE username = ? AND password = ?", [ username, password ], function (err, users) {
			if (err) throw err;
			if (users.length == 0) res.sendStatus(404);
			else if (users.length > 1) res.sendStatus(500);
			else {
				let user = users[0];
				user.password = null;
				let token = jwt.sign(user, config.secret, { expiresIn: config.loginTime  });
				res.json({ token, user });
			}
		})
	})


	/**
	 * @api {post} /users/register Register
	 * @apiName Register
	 * @apiGroup Authentication
	 * @apiVersion 1.0.0
	 * @apiParam {String} name User's Name
	 * @apiParam {String} username User's UserName
	 * @apiParam {String} password User's Password
	 * @apiError (Error 400) MissingData Required Data Missing
	 * @apiErrorExample {json} Error
	 * HTTP/1.1 400 Bad Request
	 * {
	 *    "error" : "Name Required"
		 * }
	 * @apiSuccess {Number} id New User ID
	 * @apiSuccessExample {json} Success
	 *		HTTP/1.1 200 OK
	 *		{
	 *			"id": 2
		 *		}
	 */
	.post('/register', function(req,res){

		let name 		= req.body.name;
		let username 	= req.body.username;
		let password 	= req.body.password;
		let admin 		= 0;

		if(!name) 		    res.status(400).json({error: "Name Required"});
		else if(!username) 	res.status(400).json({error: "Username Required"});
		else if(!password) 	res.status(400).json({error: "Password Required"});
		else db.query(
			"INSERT INTO users SET ?",
			{ name, username, password, admin },
			function ( err, result ){
				if ( err ) throw err;
				res.json ( { id: result.insertId } );
			}
		);
	})


	/**
	 * @api {get} /auth/check Check Auth Token
	 * @apiName CheckAuthenticationToken
	 * @apiGroup Authentication
	 * @apiVersion 1.0.0
	 *
	 * @apiSuccess {Boolean} result Did Token Pass.
	 * @apiSuccessExample {json} Token Passed
	 *	HTTP/1.1 200 OK
	 *	{
	 * 		"result" : true
	 *	}
	 * @apiErrorExample {json} Token Failed
	 *	HTTP/1.1 200 OK
	 *	{
	 * 		"result" : true
	 *	}
	 */

	.get('/check', function(req, res){
		if(req.decoded)	res.json({ result: true });
		else 			res.json({ result: false });
	});


module.exports = router;
