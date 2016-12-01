let express        = require("express");
let path           = require('path');
let app            = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/projects',    express.static('/var/projects'));
app.all('/*', function(req, res) { res.sendfile('index.html'); });

app.listen(80);