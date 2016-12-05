module.exports = {
	'secret'		: 'MikeFlynnDevelopmentPortfolioApiSuperDuperSecretCode',
	'port'			: 44562,
	'mysql': 	{
		'host' 		: 'flynndev.us',
		'user' 		: 'root',
		'password' 	: '7e8983abd51a92fb4249fa644bc359bf3aba7eb13d6222bb',
		'database' 	: 'portfolio'
	},
	'loginTime' 	: '43800m',
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
