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

worksheet.cell(1, 1).string('x');
worksheet.cell(1, 2).string('y');
worksheet.cell(1, 3).string('Elephant');
worksheet.cell(1, 4).string('Another animal');
worksheet.cell(1, 5).string('hasCrocodile');
worksheet.cell(1, 6).string('hasTiger');
worksheet.cell(1, 7).string('totalAnimal');

let oasisPositions = jsonfile.readFileSync(config.jsonFileOasis);

let oasisPositionsOccupiedArray = jsonfile.readFileSync(config.jsonFileOasisOccupied);

if (!Array.isArray(oasisPositionsOccupiedArray)) {
	oasisPositionsOccupiedArray = [];
}

let uniquePositionOccupied = new nodeUnique();

uniquePositionOccupied.add(oasisPositionsOccupiedArray);

// filter for occupied
oasisPositions = oasisPositions.filter(function (position) {
	let save = true;
	if (uniquePositionOccupied.contains(position)) {
		save = false;
	}
	return save;
});

oasisPositions.map(function (obj) {
	let rObj = obj;
	obj['distance'] = util.distance(obj.x, obj.y, config.startX, config.startY);
	return rObj;
});

oasisPositions.sort(function (a, b) {
	return parseFloat(a.distance) - parseFloat(b.distance);
});

let count = 400;

let iteration = 2;

oasisPositions = oasisPositions.slice(count * (iteration - 1), count * iteration);

let rowCounter = 2;
let animal = config.animal;
const animalTiger = 'Tiger';
const animalCrocodile = 'Crocodile';
const date = new Date();

const fileNameAdd = date.toLocaleDateString() + '_' + date.getTime();
const file = `data/elephant_${fileNameAdd}.xlsx`;

util.createFile(file);

for (let pos = 0; pos < count; pos++) {
	let {x, y} = oasisPositions[pos];

	makeSearchAnimal(x, y).then((r) => {

		let data = r.response.data.html;
		let amount = 0;

		const $ = cheerio.load(data);

		let table = $('#troop_info').first();
		let td = table.find('img[title="' + animal + '"]');
		let hasCrocodile = table.find('img[title="' + animalCrocodile + '"]');
		let hasTiger = table.find('img[title="' + animalTiger + '"]');
		let trCount = table.find('tr');

		let anotherAnimal = 0;
		let totalAnimal = 0;

		if (td.length) {
			anotherAnimal = trCount.length - 1;
			let tr = td.closest('tr');
			amount = parseInt(tr.find('.val').text(), 10);
			console.warn({x, y});
			console.warn(amount);

			const vals = table.find('.val');

			vals.each(function (i, elem) {
				totalAnimal += parseInt($(this).text(), 10);
			});
		}

		if (amount > 0) {
			worksheet.cell(rowCounter, 1).number(x);
			worksheet.cell(rowCounter, 2).number(y);
			worksheet.cell(rowCounter, 3).number(amount);
			worksheet.cell(rowCounter, 4).number(anotherAnimal);
			worksheet.cell(rowCounter, 5).number(hasCrocodile.length);
			worksheet.cell(rowCounter, 6).number(hasTiger.length);
			worksheet.cell(rowCounter, 7).number(totalAnimal);

			rowCounter++;
			workbook.write(file);
		}

		// save occupied
		const h1 = $('h1').first().text().trim();

		if (!h1.includes('Unoccupied')) {
			uniquePositionOccupied.add({x, y});

			jsonfile.writeFileSync(config.jsonFileOasisOccupied, uniquePositionOccupied.get());
		}

	});

	sleep(util.randomIntFromInterval(config.delayMin, config.delayMax));

}













