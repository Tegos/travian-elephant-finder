const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const config = require('./config');

const randomIntFromInterval = function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const distance = (x1, y1, x2, y2) => Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));

const createFile = (filename) => {
  mkdirp.sync(path.dirname(filename));

  fs.open(filename, 'r', (openErr) => {
    if (openErr) {
      fs.writeFile(filename, '', (err) => {
        if (err) {
          console.log(err);
        }
        console.log('The file was saved!');
      });
    } else {
      console.log('The file exists!');
    }
  });
};

const getApiUrl = () => `${config.travianServer}/api/v1`;

exports.distance = distance;
exports.randomIntFromInterval = randomIntFromInterval;
exports.createFile = createFile;
exports.getApiUrl = getApiUrl;
