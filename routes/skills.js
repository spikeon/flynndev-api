let express 	= require('express');
let router 		= express.Router();
let auth		= require('../inc/auth');
let db 			= require('../inc/db');


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
	 * @api {get} /skills Get All Skills
	 * @apiName GetExperiences
	 * @apiGroup Skill
	 * @apiVersion 1.0.0
	 *
	 * @apiSuccess {Object[]} skills Array of Skills
	 * @apiSuccessExample {json} Success
	 *	[
	 *		{
	 *			"id" 		: 1,
	 *			"name" 		: "John Doe",
	 *			"year"		: 1992
	 *		},
	 *		...
	 *	]
	 */

	.get('/', function(request, response){
		db.query("SELECT * FROM skills", function(err, skills){
			if(err) throw err;

			response.json(skills);
		});
	})


		/**
		 * @api {get} /skills/:id Get Skill
		 * @apiName GetExperience
		 * @apiGroup Skill
		 * @apiVersion 1.0.0
		 *
		 * @apiSuccess {Object} skill Skill Object
		 * @apiSuccessExample {json} Success
		 *	{
		 *		"id" 		: 1,
		 *		"name" 		: "John Doe",
		 *		"year"		: "1932"
	 	 *	}
		 */
	.get('/:id', function(request, response){
		let id = request.params.id;

		db.query("SELECT * FROM skills WHERE id = ?", id, function(err, skills){
			if(err) throw err;
			if(skills.length == 0) response.status(400).json({success: false, message: `ID ${id} Not Found`});
			else response.json(skills[0]);
		});
	})


		/**
		 * @api {post} /skills Add Skill
		 * @apiName AddExperience
		 * @apiGroup Skill
		 * @apiVersion 1.0.0
		 * @apiUse authCheck
		 * @apiPermission admin
		 * @apiParam {String} name Skill Name
		 * @apiParam {Number} year Skill Year
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
	.post('/', auth.Token, auth.Admin, function(request, response){

		let name = request.body.name;
		let year = request.body.year;

		if(!name) 		res.status(400).json({error: "Name Required"});
		if(!year) 		res.status(400).json({error: "Year Required"});

		db.query(
			"INSERT INTO skills SET ?",
			{ name, year },
			function(err, result){
				if(err) throw err;
				response.status(200).json({ id: result.insertId });
			}
		);

	})
	/**
	 * @api {put} /skills Update Skill
	 * @apiName UpdateExperience
	 * @apiGroup Skill
	 * @apiVersion 1.0.0
	 * @apiUse authCheck
	 * @apiPermission admin
	 * @apiParam {Object} skill Skill object { id, name, year }
	 * @apiError (Error 400) MissingData Required Data Missing
	 * @apiError (Error 404) ExperienceNotFound Skill was not found
	 * @apiErrorExample {json} Error
	 * HTTP/1.1 400 Bad Request
	 * {
	 *    "error" : "Name Required"
 	 * }
	 * @apiErrorExample Not Found
	 *		HTTP/1.1 404 Not Found
	 * @apiSuccessExample Success
	 *		HTTP/1.1 200 OK
	 */
	.put('/', auth.Token, function(request, response){

		let id = request.body.skill.id;
		let name = request.body.skill.id;
		let year = request.body.skill.id;

		if(!id)			res.status(400).json({error: "ID Required"});
		else if(!name) 		res.status(400).json({error: "Name Required"});
		else if(!year) 		res.status(400).json({error: "Year Required"});
		else db.query(
			"UPDATE skills SET ? WHERE id = ?",
			[
				{name, year},
				id
			],
			function(err, result){
				if(err) throw err;
				if(result.affectedRows > 0) response.sendStatus(200);
				else respomse.sendStatus(404);
			}
		);
	})

	/**
	 * @api {delete} /skills/:id Delete Skill
	 * @apiName DeleteExperience
	 * @apiGroup Skill
	 * @apiVersion 1.0.0
	 * @apiUse authCheck
	 * @apiPermission admin
	 * @apiParam {Number} id Skill Unique ID
	 * @apiError (Error 404) ExperienceNotFound Skill was not found
	 * @apiErrorExample Not Found
	 *		HTTP/1.1 404 Not Found
	 * @apiSuccessExample Success
	 *		HTTP/1.1 200 OK
	 */

	.delete('/:id', auth.Token, function(request, response){
		let id = request.params.id;
		db.query("DELETE FROM skills WHERE id = ?", id, function(err, result){
			if(err) throw err;
			response.sendStatus(result.affectedRows == 0 ? 404 : 200);
		});
	});

module.exports = router;
