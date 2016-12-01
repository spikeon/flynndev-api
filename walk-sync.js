let fs          = require('fs');
let path        = require('path');
let multimatch  = require('multimatch');

module.exports = function walkSync(dir, filelist = [], ignores = [], projectPath = "") {

	let files = fs.readdirSync(dir);

	files.forEach(function(file) {

		var filepath = path.join(dir, file);

		let matches = multimatch(file, ignores);

		if(matches.length == 0) {

			if (fs.statSync(filepath).isDirectory()) filelist = walkSync(filepath, filelist, ignores, projectPath);

			else filelist.push({
				path: filepath.replace(projectPath + '/', ''),
				name: file,
				content: fs.readFileSync(filepath, 'utf8')
			});
		}
	});
	return filelist;
};