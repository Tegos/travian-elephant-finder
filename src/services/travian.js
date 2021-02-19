const rp = require('request-promise');
const config = require('~src/config');

const Travian = function Travian() {
  this.animals = {
    Rats: 'u31',
    Spiders: 'u32',
    Snakes: 'u33',
    Bats: 'u34',
    Bears: 'u37',
    Crocodiles: 'u38',
    Tigers: 'u39',
    Elephants: 'u40',
  };

  this.getApiUrl = function viewTileDetails() {
    return `${config.travian.server}/api/v1`;
  };

  this.viewTileDetails = function viewTileDetails(x, y) {
    const sendData = {
      x,
      y,
    };

    return rp.post(
      `${this.getApiUrl()}/ajax/viewTileDetails`,
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

  this.refreshToken = function viewTileDetails(x, y) {
    const sendData = {
      x,
      y,
    };

    return rp.post(
      `${this.getApiUrl()}/ajax/viewTileDetails`,
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
