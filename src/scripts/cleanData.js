const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');
const config = require('~src/config');

const directory = 'data';

fs.readdir(directory, (readErr, files) => {
  if (readErr) throw readErr;

  const filterFiles = files.filter((item) => !(/(^|\/)\.[^/.]/g).test(item));

  filterFiles.forEach((file) => {
    fs.unlink(path.join(directory, file), (err) => {
      if (err) throw err;
    });
  });

  // fs.createWriteStream(config.jsonFile.oasis);
  // fs.createWriteStream(config.jsonFile.oasisOccupied);

  jsonfile.writeFileSync(config.jsonFile.oasis, []);
  jsonfile.writeFileSync(config.jsonFile.oasisOccupied, []);
});

console.log(`Directory ${directory} cleaned`);
