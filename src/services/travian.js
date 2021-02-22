const axios = require('axios');
const config = require('~src/config');
const cheerio = require('cheerio');

axios.defaults.headers.Cookie = config.authorization.cookie;
axios.defaults.headers['User-Agent'] = config.userAgent;
axios.defaults.withCredentials = true;

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

    return axios.post(
      `${this.getApiUrl()}/ajax/viewTileDetails`,
      {
        json: true,
        method: 'POST',
        form: sendData
      },
    );
  };

  this.refreshToken = async function refreshToken() {
    try {
      const url = `${config.travian.server}/dorf1.php`;
      const response = await axios.get(url);
      const bodyString = response.data;

      const $ = cheerio.load(bodyString);

      const scriptNode = $('head > script')
        .map((i, x) => x.children[0])
        .filter((i, x) => x && x.data.match(/eval/))
        .get(0);

      if (scriptNode) {
        let lines = scriptNode.data.split('\n');
        let atobStringFull = '';
        let token = '';

        lines.forEach(function (line) {
          if (line.includes('eval')) {
            atobStringFull = line;
          }
        });

        const regExp = /\(([^)]+)\)/;
        let matches = regExp.exec(atobStringFull);

        let atobString = matches[1];
        atobString = atobString.replace(/'/g, '')
          .replace('atob(', '');

        console.log(atobString);

        //let baseString = atob(atobString);
        console.log(Buffer.from(atobString, 'base64')
          .toString('binary'));

        // var scriptText = textNode.data.replace(/\r?\n|\r/g, '')
        //   .replace(/file:/g, '"file":')
        //   .replace(/label:/g, '"label":');
        // var jsonString = /sources:(.*)}\);/.exec(scriptText)[1];
        // var sources = JSON.parse(jsonString);
      }

      //console.log(bodyString);
    } catch (error) {
      console.error(error);
    }

    // return rp.get(
    //   `${this.getApiUrl()}/dorf1.php`,
    //   {
    //     headers: {
    //       cookie: config.cookie,
    //       authorization: config.authorization,
    //       'User-Agent': config.userAgent,
    //     },
    //   },
    // );
  };

};

module.exports = new Travian();
