const rp = require('request-promise');
const cheerio = require('cheerio');
const sleep = require('system-sleep');
const jsonfile = require('jsonfile');
const config = require('./config');

const util = require('./util');

const makeSearchOasis = (x, y) => {
  const { travianServer } = config;

  const sendData = {
    cmd: 'viewTileDetails',
    x,
    y,
    ajaxToken: config.ajaxToken,
  };

  return rp.post(
    `${travianServer}/ajax.php?cmd=viewTileDetails`,
    {
      json: true,
      method: 'POST',
      form: sendData,
      headers: {
        cookie: config.cookie,
        'User-Agent': config.userAgent,
      },
    },
  );
};

let oasisPosition = jsonfile.readFileSync(config.jsonFileOasis);

if (!Array.isArray(oasisPosition)) {
  oasisPosition = [];
}

for (let x = config.minX; x < config.maxX; x++) {
  for (let y = config.minY; y < config.maxY; y++) {
    makeSearchOasis(x, y).then((r) => {
      const data = r.response.data.html;

      const $ = cheerio.load(data);

      const tileDetails = $('#tileDetails');
      const className = tileDetails.attr('class');
      if (className.includes('oasis')) {
        oasisPosition.push({
          x, y,
        });
        console.warn(oasisPosition);

        jsonfile.writeFileSync(config.jsonFileOasis, oasisPosition);
      }
    });

    sleep(util.randomIntFromInterval(config.delayMin, config.delayMax));
  }
}
