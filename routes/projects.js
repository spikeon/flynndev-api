let express             = require('express');
let router              = express.Router();
let auth                = require('../auth');
let db                  = require('../db');
let config              = require('../config');
let os                  = require('os');
let fs                  = require('fs');
let path                = require('path');
let multimatch          = require('multimatch');
let showdown            = require('showdown');
let sd                  = new showdown.Converter();
let sharp               = require('sharp');
let requireUncached     = require('../require-uncached');
let walkSync            = require('../walk-sync');


let getProjects = function(){

	let projects = [];

	for( let root_path of config.projects_root ){

		let files = fs.readdirSync(root_path);

		files.forEach(function(file) {
			let project = buildProject(file);
			if(project) projects.push(project);
		});

	}


	return projects;
}

let getProjectFile = function(file, full_folder){
	return fs.existsSync(`${full_folder}/${file}`) ? fs.readFileSync(`${full_folder}/${file}`, 'utf8') : "";
};

let getProjectMd = function(file, full_folder){
	return fs.existsSync(`${full_folder}/${file}`) ? sd.makeHtml(fs.readFileSync(`${full_folder}/${file}`, 'utf8')) : "";
};

let get_root = function(folder){
	for( let pos_root of config.projects_root ) if( fs.existsSync(`${pos_root}${folder}`) ) return pos_root;
	return false;
};


let buildProject = function(folder, all = false) {

	let root_path = get_root(folder);
	if( ! root_path ) return false;

	let full_folder = `${root_path}${folder}`;

	if( ! fs.statSync(full_folder).isDirectory() ) return false;
	if( ! fs.existsSync(full_folder + '/package.json') ) return false;

	let info = requireUncached(`${full_folder}/package.json`);

	if(info.portfolio_hide === true) return false;

	let ignores = fs.existsSync(full_folder + '/.projectignores') ? config.ignore.concat(getProjectFile('.projectignores', full_folder).split("\n")) : config.ignore;

	//let url = config.web_root + folder;

	let gallery = [];

	for(let i = 1; i < 10; i++){
		let galleryurl = fs.existsSync(`${full_folder}/gallery${i}.png`) ? `${config.web_root}projects/${folder}/gallery/${i}` : false;
		if(galleryurl) gallery.push(galleryurl);
	}

	let project     = {
		id      :   folder,
		thumb   :   fs.existsSync(`${full_folder}/thumb.png`) ? `${config.web_root}projects/${folder}/thumb` : false,
		url     :   info.liveurl,
		name    :   info.description ? info.description : folder,
		files   :   all ? walkSync(full_folder, [], ignores, full_folder) : [],
		gallery :   gallery,
		about   :   all ? getProjectMd('ABOUT.md', full_folder) : "",

	};

	return project;
}

/**
 * @apiDefine authCheck Authentication Token
 * @apiParam {String} token Auth Token - Can be post, get, or header x-access-token
 */

 /**
  * @apiDefine admin Admin Access Only
  * Only projects whose token includes administrator access have access to this
  */

router

	/**
	 * @api {get} /projects Get All Projects
	 * @apiName GetProjects
	 * @apiGroup Project
	 * @apiVersion 1.0.0
	 *
	 * @apiSuccess {Object[]} projects Array of Projects
	 * @apiSuccessExample {json} Success
	 *	[
	 *		{
	 *			"id" 		: 1,
	 *			"name" 		: "John Doe",
	 *			...
 	 *		},
	 *		...
	 *	]
	 */
	.get('/',  function(req, res){
		res.json(getProjects());
	})

	/**
	 * @api {get} /projects/:id Get Project
	 * @apiName GetProject
	 * @apiGroup Project
	 * @apiVersion 1.0.0
	 *
	 * @apiSuccess {Object} project Project Object
	 * @apiSuccessExample {json} Success
	 *	{
	 *		"id" 		: 1,
	 *		"name" 		: "John Doe",
	 *		...
 	 *	}
	 */
	.get('/:id',  function(req, res){
		let folder = req.params.id;
		res.json(buildProject(folder, true));
	})

	/**
	 * @api {get} /projects/:id/thumb Get Project Thumbnail
	 * @apiName GetProjectThumbnail
	 * @apiGroup Project
	 * @apiVersion 1.0.0
	 *
	 * @apiSuccess File
	 */
	.get('/:id/thumb', function(req, res){
		let folder = req.params.id;
		let root_path = get_root(folder);
		if( ! root_path ) res.sendStatus(404);
		else{
			let thumb_path = `${root_path}${folder}/thumb.png`;
			if(fs.existsSync(thumb_path)) res.sendFile(thumb_path);
			else res.sendStatus(404);
		}
	})

	/**
	 * @api {get} /projects/:id/thumb/:size Get Project Thumbnail Resized
	 * @apiName GetProjectThumbnailResized
	 * @apiGroup Project
	 * @apiVersion 1.0.0
	 *
	 * @apiSuccess File
	 */
	.get('/:id/thumb/:size', function(req, res){
		let folder = req.params.id;
		let size = req.params.size * 1;
		let root_path = get_root(folder);
		if( ! root_path ) res.sendStatus(404);
		else{
			let thumb_path = `${root_path}${folder}/thumb.png`;
			if(fs.existsSync(thumb_path)){
				console.log(`Got to sharp ${size}px`);
				sharp(thumb_path)
					.resize(size, size)
					.min()
					.png()
					.toBuffer(
						(err, file_content, info) => {
							console.log(err);
							if(err) throw err;
							console.log(info);
							res.type('png');
							res.send(file_content);
						}
					);
			}
			else res.sendStatus(404);
		}
	})


	/**
	 * @api {get} /projects/:id/gallery/:i Get Project Gallery Image
	 * @apiName GetProjectGalleryImage
	 * @apiGroup Project
	 * @apiVersion 1.0.0
	 *
	 * @apiSuccess File
	 */
	.get('/:id/gallery/:i', function(req, res){

		let folder = req.params.id;
		let i = req.params.i;
		let root_path = get_root(folder);
		if( ! root_path ) res.sendStatus(404);
		else{
			let img_path = `${root_path}${folder}/gallery${i}.png`;
			if(fs.existsSync(img_path)) res.sendFile(img_path);
			else res.sendStatus(404);
		}
	})
	/**
	 * @api {get} /projects/:id/gallery/:i/:size Get Project Gallery Image Resized
	 * @apiName GetProjectGalleryImage
	 * @apiGroup Project
	 * @apiVersion 1.0.0
	 *
	 * @apiSuccess File
	 */
	.get('/:id/gallery/:i/:size', function(req, res){
		let folder = req.params.id;
		let size = req.params.size * 1;
		let i = req.params.i;
		let root_path = get_root(folder);
		if( ! root_path ) res.sendStatus(404);
		else{
			let img_path = `${root_path}${folder}/gallery${i}.png`;
			if(fs.existsSync(img_path)){
				sharp(img_path)
					.resize(size, size)
					.min()
					.png()
					.toBuffer(
						(err, file_content, info) => {
							console.log(err);
							if(err) throw err;
							console.log(info);
							res.type('png');
							res.send(file_content);
						}
					);
			}
			else res.sendStatus(404);
		}
	})

 ;

module.exports = router;