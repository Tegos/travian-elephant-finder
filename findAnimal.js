const config = require('./config');
const rp = require('request-promise');
const excel = require('excel4node');
const cheerio = require('cheerio');
const sleep = require('system-sleep');
const jsonfile = require('jsonfile');
const nodeUnique = require('node-unique-array');

const util = require('./util');

let makeSearchAnimal = (x, y) => {
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
			headers: {'cookie': config.cookie},
		}
	);


};


let workbook = new excel.Workbook();
let worksheet = workbook.addWorksheet('Sheet 1', {});

let uniquePosition = new nodeUnique();


worksheet.cell(1, 1).string('x');
worksheet.cell(1, 2).string('y');
worksheet.cell(1, 3).string('Elephant');

let oasisPositions = jsonfile.readFileSync(config.jsonFileOasis);



//uniquePosition.add(oasisPositions);

//oasisPositions = uniquePosition.get();

//console.warn(oasisPositions);

oasisPositions.map(function (obj) {
	let rObj = obj;
	obj['distance'] = util.distance(obj.x, obj.y, config.startX, config.startY);
	return rObj;
});

oasisPositions.sort(function (a, b) {
	return parseFloat(a.distance) - parseFloat(b.distance);
});

//console.log(oasisPositions);
let count = 500;
oasisPositions = oasisPositions.slice(0, count);

//console.warn(oasisPositions);
//process.exit(9);

let rowCounter = 2;
let animal = config.animal;
for (let pos = 0; pos < count; pos++) {
	let {x, y} = oasisPositions[pos];

	makeSearchAnimal(x, y).then((r) => {

		let data = r.response.data.html;
		let amount = 0;

		const $ = cheerio.load(data);

		let td = $('img[title="' + animal + '"]');
		if (td.length) {
			let tr = td.closest('tr');
			amount = parseInt(tr.find('.val').text(), 10);
			console.warn({x, y});
			console.warn(amount);
		}

		if (amount > 0) {
			worksheet.cell(rowCounter, 1).number(x);
			worksheet.cell(rowCounter, 2).number(y);
			worksheet.cell(rowCounter, 3).number(amount);

			rowCounter++;

			workbook.write('data/elephant.xlsx');
		}

	});

	sleep(util.randomIntFromInterval(200, 1000));


}











