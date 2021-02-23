const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const config = require('~src/config');

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

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

const checkConfiguration = () => {
  const requiredOptions = [
    'authorization.cookie',
    'travian.server',
    'coordinates.minX',
    'coordinates.minY',
    'coordinates.maxX',
    'coordinates.maxY',
    'coordinates.startX',
    'coordinates.startY',
  ];

  const emptyConfigOptions = [];

  for (const option of requiredOptions) {
    if (isEmpty(config.get(option))) {
      emptyConfigOptions.push(option);
    }
  }

  if (emptyConfigOptions.length > 0) {
    console.warn(`You must provide correct configuration for this option: ${emptyConfigOptions}`);
    process.exit();
  }
};

/**
 * Checks if a JavaScript value is empty
 * @example
 *    isEmpty(null); // true
 *    isEmpty(undefined); // true
 *    isEmpty(''); // true
 *    isEmpty([]); // true
 *    isEmpty({}); // true
 * @param {any} value - item to test
 * @returns {boolean} true if empty, otherwise false
 */
const isEmpty = function (value) {
  return (
    value === null // check for null
    || value === undefined // check for undefined
    || value === '' // check for empty string
    || (Array.isArray(value) && value.length === 0) // check for empty array
    || (typeof value === 'object' && Object.keys(value).length === 0) // check for empty object
  );
};

exports.distance = distance;
exports.randomIntFromInterval = randomIntFromInterval;
exports.createFile = createFile;
exports.checkConfiguration = checkConfiguration;
exports.isEmpty = isEmpty;
