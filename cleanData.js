const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');
const config = require('./config');

const directory = 'data';

fs.readdir(directory, (readErr, files) => {
  if (readErr) throw readErr;

  const filterFiles = files.filter((item) => !(/(^|\/)\.[^/.]/g).test(item));

  filterFiles.forEach((file) => {
    fs.unlink(path.join(directory, file), (err) => {
      if (err) throw err;
    });
  });

  fs.createWriteStream(config.jsonFileOasis);
  fs.createWriteStream(config.jsonFileOasisOccupied);

  jsonfile.writeFileSync(config.jsonFileOasis, []);
  jsonfile.writeFileSync(config.jsonFileOasisOccupied, []);
});

console.log(`Directory ${directory} cleaned`);
