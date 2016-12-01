let express			= require('express');
let app 			= express();

let morgan 			= require('morgan');

let config			= require('./config');

let skillRoutes		= require('./routes/skills');
let userRoutes 		= require('./routes/users');
let projectRoutes	= require('./routes/projects');
let authRoutes		= require('./routes/auth');

let authCheck		= require('./auth');

let port 			= process.env.PORT || config.port;

let bodyParser 		= require('body-parser');
let parseUrlencoded = bodyParser.urlencoded({extended: false});

function errorHandler (err, req, res, next) {
	console.log(err);
	if (res.headersSent) return next(err);
	res.status(500)
	res.json({ error: err });
}

app.use(morgan('prod'));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
	next();
});

app.use(parseUrlencoded);
app.use(bodyParser.json());
app.use(authCheck.Init);
app.use(express.static(__dirname + '/public'));

app.use('/auth', 			authRoutes);
app.use('/skills', 			skillRoutes);
app.use('/users',			userRoutes);
app.use('/projects',		projectRoutes);

app.use(errorHandler);

/* Start Server */
app.listen(port, function(){
	console.log(`Listening on port ${port}`);
});
