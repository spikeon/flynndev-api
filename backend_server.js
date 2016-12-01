let express			= require('express');
let app 			= express();

let morgan 			= require('morgan');

let config			= require('./config/api_config');

let skillRoutes		= require('./routes/skills');
let userRoutes 		= require('./routes/users');
let projectRoutes	= require('./routes/projects');
let authRoutes		= require('./routes/auth');

let authCheck		= require('./inc/auth');

let port 			= process.env.PORT || config.port;

let bodyParser 		= require('body-parser');
let parseUrlencoded = bodyParser.urlencoded({extended: false});

let errorHandler    = require('./inc/error-handler');
let crossSite       = require('./inc/cross-site');

app.use(morgan('tiny'));

app.use(crossSite);

app.use(parseUrlencoded);
app.use(bodyParser.json());
app.use(authCheck.Init);

app.use('/auth', 			authRoutes);
app.use('/skills', 			skillRoutes);
app.use('/users',			userRoutes);
app.use('/projects',		projectRoutes);

app.use(errorHandler);

/* Start Server */

app.listen(port);
