let express        = require("express");
let path           = require('path');
let app            = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/projects',    express.static('/var/projects'));
app.use('/api',         express.static(path.join(__dirname , 'api')));
app.all('/*', function(req, res) { res.sendfile(path.join(__dirname, 'dist', 'index.html')); });
app.listen(80);