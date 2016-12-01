let express = require('express');
let router = express.Router();
let auth = require('../inc/auth');
let db = require('../inc/db');
/**
 * @apiDefine authCheck Authentication Token
 * @apiParam {String} token Auth Token - Can be post, get, or header x-access-token
 */

 /**
  * @apiDefine admin Admin Access Only
  * Only users whose token includes administrator access have access to this
  */
router

	/**
	 * @api {get} /users Get All Users
	 * @apiName GetUsers
	 * @apiGroup User
	 * @apiVersion 1.0.0
	 *
	 * @apiSuccess {Object[]} users Array of Users
	 * @apiSuccessExample {json} Success
	 *	[
	 *		{
	 *			"id" 		: 1,
	 *			"name" 		: "John Doe",
	 *			"username"	: "johndoe132",
	 *			"password"	: NULL
	 *			"admin"		: 0
 	 *		},
	 *		...
	 *	]
	 */
	.get('/',  function(req, res){
		db.query("SELECT *, NULL as password FROM users", function(err, users){
			if(err) throw err;
			res.json(users);
		});
	})

	/**
	 * @api {get} /users/:id Get User
	 * @apiName GetUser
	 * @apiGroup User
	 * @apiVersion 1.0.0
	 *
	 * @apiSuccess {Object} user User Object
	 * @apiSuccessExample {json} Success
	 *	{
	 *		"id" 		: 1,
	 *		"name" 		: "John Doe",
	 *		"username"	: "johndoe132",
	 *		"password"	: NULL
	 *		"admin"		: 0
 	 *	}
	 */
	.get('/:id',  function(req, res){

		let id 	= req.params.id;

		db.query("SELECT *, NULL as password FROM users WHERE id = ?", id, function(err, users){
			if(err) throw err;
			res.json(users[0]);
		});
	})

	/**
	 * @api {get} /users/promote/:id Promote User
	 * @apiName PromoteUser
	 * @apiGroup User
	 * @apiVersion 1.0.0
	 *
	 */
	.get('/promote/:id', auth.Token, auth.Admin,  function(req, res){
		let id 			= req.params.id;
		db.query("UPDATE users SET admin = 1 WHERE id = ?", id, function(err, result){
			if(err) throw err;
			if(result.affectedRows > 0) res.status(200).send({});
			else res.sendStatus(404);
		});
	})

	/**
	 * @api {get} /users/demote/:id Demote User
	 * @apiName PromoteUser
	 * @apiGroup User
	 * @apiVersion 1.0.0
	 *
	 */
	.get('/demote/:id', auth.Token, auth.Admin,  function(req, res){
		let id 			= req.params.id;
		db.query("UPDATE users SET admin = 0 WHERE id = ?", id, function(err, result){
			if(err) throw err;
			if(result.affectedRows > 0) res.status(200).send({});
			else res.sendStatus(404);
		});
	})


	/**
	 * @api {post} /users Add User
	 * @apiName AddUser
	 * @apiGroup User
	 * @apiVersion 1.0.0
	 * @apiUse authCheck
	 * @apiPermission admin
	 * @apiParam {String} name User's Name
	 * @apiParam {String} username User's UserName
	 * @apiParam {String} password User's Password
	 * @apiParam {Boolean} admin Is User Admin
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
	.post('/', auth.Token, auth.Admin, function(req,res){
		let name 		= req.body.name;
		let username 	= req.body.username;
		let password 	= req.body.password;
		let admin 		= req.body.admin ? 1 : 0;

		if(!name) 		res.status(400).json({error: "Name Required"});
		else if(!username) 	res.status(400).json({error: "Username Required"});
		else if(!password) 	res.status(400).json({error: "Password Required"});
		else db.query(
			"INSERT INTO users SET ?",
			{name, username, password, admin},
			function(err, result){
				if(err) throw err;
				res.json({id: result.insertId });
			}
		);

	})

	/**
	 * @api {put} /users Update User
	 * @apiName UpdateUser
	 * @apiGroup User
	 * @apiVersion 1.0.0
	 * @apiUse authCheck
	 * @apiPermission admin
	 * @apiParam {Number} id User's Unique ID
	 * @apiParam {String} name User's Name
	 * @apiParam {String} username User's UserName
	 * @apiParam {String} password User's Password
	 * @apiParam {Boolean} admin Is User Admin
	 * @apiError (Error 400) MissingData Required Data Missing
	 * @apiErrorExample {json} Error
	 * 		HTTP/1.1 400 Bad Request
	 * 		{
	 *    		"error" : "Name Required"
 	 * 		}
	 * @apiSuccessExample Success
	 *		HTTP/1.1 200 OK
	 * 		{}
	 */
	.put('/:id', auth.Token, auth.Admin, function(req, res){
		let id 			= req.body.id;
		let name 		= req.body.name;
		let username 	= req.body.username;
		let password 	= req.body.password;
		let admin 		= req.body.admin ? 1 : 0;

		if(!name) 			res.status(400).json({success: false, message: "Name Required"});
		else if(!username) 	res.status(400).json({success: false, message: "Username Required"});
		else if(!password) 	res.status(400).json({success: false, message: "Password Required"});
		else db.query(
			"UPDATE users SET ? WHERE id = ?",
			[
				{name, username, password, admin},
				id
			],
			function(err, result){
				if(err) throw err;
				res.status(200).send({});
			}
		);
	})

	/**
	 * @api {delete} /users/:id Delete User
	 * @apiName DeleteUser
	 * @apiGroup User
	 * @apiVersion 1.0.0
	 * @apiUse authCheck
	 * @apiPermission admin
	 * @apiParam {Number} id User's Unique ID
	 * @apiError (Error 400) UserNotFound User was not found
	 * @apiErrorExample Error
	 *		HTTP/1.1 400 Bad Request
	 * @apiSuccessExample Success
	 *		HTTP/1.1 200 OK
	 */
	.delete('/:id', auth.Token, auth.Admin, function(req,res){

		let id 	= req.params.id;

		db.query(
			"DELETE FROM users WHERE id = ?",
			id,
			function(err, result){
				if(err) throw err;
				res.sendStatus( result.affectedRows == 0 ? 400 : 200  );
			}
		);
	});
module.exports = router;
