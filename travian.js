const rp = require('request-promise');
const util = require('./util');
const config = require('./config');

const Travian = function Travian() {
  this.viewTileDetails = function viewTileDetails(x, y) {
    const sendData = {
      x,
      y,
    };

    return rp.post(
      `${util.getApiUrl()}/ajax/viewTileDetails`,
      {
        json: true,
        method: 'POST',
        form: sendData,
        headers: {
          cookie: config.cookie,
          authorization: config.authorization,
          'User-Agent': config.userAgent,
        },
      },
    );
  };
};

module.exports = new Travian();
