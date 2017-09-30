const config = require('./config');
const excelbuilder = require('msexcel-builder');
const rp = require('request-promise');
const excel = require('excel4node');

let resultOfSearch = [];

let makeSearchElephant = (x, y) => {
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


let rowCounter = 2;
for (let x = -5; x < 5; x++) {
	for (let y = -5; y < 5; y++) {
		makeSearchElephant(x, y).then((r) => {

			let data = r.response.data.html;
			console.warn(data);

			worksheet.cell(rowCounter, 1).number(x);
			worksheet.cell(rowCounter, 2).number(y);
			worksheet.cell(rowCounter, 3).string(data);

			rowCounter++;

			workbook.write('data/elephant.xlsx');

		});
	}
}











