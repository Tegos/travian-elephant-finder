const fs = require('fs');
const path = require('path');
const config = require('./config');
const jsonfile = require('jsonfile');

const directory = 'data';

fs.readdir(directory, (err, files) => {
	if (err) throw err;

	for (const file of files) {
		fs.unlink(path.join(directory, file), err => {
			if (err) throw err;
		});
	}
});

fs.createWriteStream(config.jsonFileOasis);
fs.createWriteStream(config.jsonFileOasisOccupied);

jsonfile.writeFileSync(config.jsonFileOasis, []);
jsonfile.writeFileSync(config.jsonFileOasisOccupied, []);

console.log(`Directory ${directory} cleaned`);










