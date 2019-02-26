const config = require('./config');
const rp = require('request-promise');
const cheerio = require('cheerio');
const sleep = require('system-sleep');
const jsonfile = require('jsonfile');

const util = require('./util');

let makeSearchOasis = (x, y) => {
	let travianServer = config.travianServer;

	let sendData = {
		cmd: 'viewTileDetails',
		x: x,
		y: y,
		ajaxToken: config.ajaxToken
	};

	return rp.post(
		travianServer + '/ajax.php?cmd=viewTileDetails',
		{
			json: true,
			method: 'POST',
			form: sendData,
			headers: {
				'cookie': config.cookie,
				'User-Agent': config.userAgent
			},
		}
	);

};

let oasisPosition = jsonfile.readFileSync(config.jsonFileOasis);

if (!Array.isArray(oasisPosition)) {
	oasisPosition = [];
}

for (let x = config.minMap; x < config.maxMap; x++) {
	for (let y = config.minMap; y < config.maxMap; y++) {

		makeSearchOasis(x, y).then((r) => {

			let data = r.response.data.html;

			const $ = cheerio.load(data);

			let tileDetails = $('#tileDetails');
			let className = tileDetails.attr('class');
			if (className.includes('oasis')) {
				oasisPosition.push({
					x, y
				});
				console.warn(oasisPosition);

				jsonfile.writeFileSync(config.jsonFileOasis, oasisPosition);
			}

		});

		sleep(util.randomIntFromInterval(config.delayMin, config.delayMax));
	}
}











