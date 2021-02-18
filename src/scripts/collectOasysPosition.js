const cheerio = require('cheerio');
const sleep = require('system-sleep');
const jsonfile = require('jsonfile');
const config = require('./config');
const util = require('./util');
const travian = require('./travian');

let oasisPosition = jsonfile.readFileSync(config.jsonFileOasis);

if (!Array.isArray(oasisPosition)) {
  oasisPosition = [];
}

const startX = Math.min(config.minX, config.maxX);
const endX = Math.max(config.minX, config.maxX);

const startY = Math.min(config.minY, config.maxY);
const endY = Math.max(config.minY, config.maxY);

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

          jsonfile.writeFileSync(config.jsonFileOasis, oasisPosition);
        }
      })
      .catch((err) => {
        if (err.response.statusCode === 401) {
          console.error('You had provided bad credentials');
        } else {
          console.warn(err);
        }
        process.exit(1);
      });

    sleep(util.randomIntFromInterval(config.delayMin, config.delayMax));
  }
}
