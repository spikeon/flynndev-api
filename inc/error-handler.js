module.exports = function (err, req, res, next) {
	// console.log(err);
	if (res.headersSent) return next(err);
	//res.status(500)
	//res.json({ error: err });
	res.sendStatus(500);
}