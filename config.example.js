module.exports = {
	'secret'		: '...',
	'port'			: 44562,
	'mysql': 	{
		'host' 		: 'flynndev.us',
		'user' 		: 'root',
		'password' 	: '...',
		'database' 	: 'portfolio'
	},
	'loginTime' 	: '1440m',
	'projects_root' : [
		'/var/projects/',
		'/var/node/'
	],
	'web_root' : 'http://flynndev.us:44562/',
	'ignore' : [
		'projects',
		'node_modules',
		'.git',
		'.idea',
		'npm-debug.log',
		'.npm-install-changed.json',
		'.DS_Store',
		'*.png',
		'*.min.*',
		'.projectignores',
		'*.md',
		'*.psd',
		'.gitignore'
	]
}
