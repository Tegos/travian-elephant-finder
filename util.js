const fs = require('fs');

const randomIntFromInterval = function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const distance = (x1, y1, x2, y2) => {
	return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
};

const createFile = (filename) => {
	fs.open(filename, 'r', function (err, fd) {
		if (err) {
			fs.writeFile(filename, '', function (err) {
				if (err) {
					console.log(err);
				}
				console.log("The file was saved!");
			});
		} else {
			console.log("The file exists!");
		}
	});
};

exports.distance = distance;
exports.randomIntFromInterval = randomIntFromInterval;
exports.createFile = createFile;