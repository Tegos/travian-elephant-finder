const cheerio = require('cheerio');
const sleep = require('system-sleep');
const jsonfile = require('jsonfile');
const config = require('~src/config');
const util = require('~src/services/util');
const travian = require('~src/services/travian');

let oasisPosition = jsonfile.readFileSync(config.jsonFile.oasis);

if (!Array.isArray(oasisPosition)) {
  oasisPosition = [];
}

util.checkConfiguration();


const startX = Math.min(+config.coordinates.minX, +config.coordinates.maxX);
const endX = Math.max(+config.coordinates.minX, +config.coordinates.maxX);

const startY = Math.min(+config.coordinates.minY, +config.coordinates.maxY);
const endY = Math.max(+config.coordinates.minY, +config.coordinates.maxY);

for (let x = startX; x < endX; x++) {
  for (let y = startY; y < endY; y++) {
    travian.viewTileDetails(x, y)
      .then((r) => {
        const data = r.html;

        const $ = cheerio.load(data);

        const tileDetails = $('#tileDetails');
        const className = tileDetails.attr('class');
        if (className.includes('oasis')) {
          oasisPosition.push({
            x,
            y,
          });

          jsonfile.writeFileSync(config.jsonFile.oasis, oasisPosition);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.error('You had provided bad credentials');
        } else {
          console.warn(err);
        }
        process.exit(1);
      });

    sleep(util.randomIntFromInterval(+config.delay.min, +config.delay.max));
  }
}
