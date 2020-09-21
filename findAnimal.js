const excel = require('excel4node');
const cheerio = require('cheerio');
const sleep = require('system-sleep');
const jsonfile = require('jsonfile');
const NodeUnique = require('node-unique-array');
const config = require('./config');
const util = require('./util');
const travian = require('./travian');

const workbook = new excel.Workbook();
const worksheet = workbook.addWorksheet('Sheet 1', {});

worksheet.cell(1, 1)
  .string('x');
worksheet.cell(1, 2)
  .string('y');
worksheet.cell(1, 3)
  .string('Elephant');
worksheet.cell(1, 4)
  .string('Another animal');
worksheet.cell(1, 5)
  .string('hasCrocodile');
worksheet.cell(1, 6)
  .string('hasTiger');
worksheet.cell(1, 7)
  .string('totalAnimal');

let oasisPositions = jsonfile.readFileSync(config.jsonFileOasis);

let oasisPositionsOccupiedArray = jsonfile.readFileSync(config.jsonFileOasisOccupied);

if (!Array.isArray(oasisPositionsOccupiedArray)) {
  oasisPositionsOccupiedArray = [];
}

const uniquePositionOccupied = new NodeUnique();

uniquePositionOccupied.add(oasisPositionsOccupiedArray);

// filter for occupied
oasisPositions = oasisPositions.filter((position) => {
  let save = true;
  if (uniquePositionOccupied.contains(position)) {
    save = false;
  }
  return save;
});

oasisPositions.map((obj) => {
  const rObj = obj;
  rObj.distance = util.distance(obj.x, obj.y, config.startX, config.startY);
  return rObj;
});

oasisPositions.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

const count = 400;

const iteration = 1;

oasisPositions = oasisPositions.slice(count * (iteration - 1), count * iteration);

let rowCounter = 2;
const { animal } = config;
const animalTiger = 'Tiger';
const animalCrocodile = 'Crocodile';
const date = new Date();

const fileNameAdd = `${date.toLocaleDateString()}_${date.getTime()}`;
const file = `data/elephant_${fileNameAdd}.xlsx`;

util.createFile(file);

for (let pos = 0; pos < oasisPositions.length; pos++) {
  const { x, y } = oasisPositions[pos];

  travian.viewTileDetails(x, y)
    .then((r) => {
      const data = r.html;
      let amount = 0;

      const $ = cheerio.load(data);

      const table = $('#troop_info')
        .first();
      const td = table.find(`img[title="${animal}"]`);
      const hasCrocodile = table.find(`img[title="${animalCrocodile}"]`);
      const hasTiger = table.find(`img[title="${animalTiger}"]`);
      const trCount = table.find('tr');

      let anotherAnimal = 0;
      let totalAnimal = 0;

      if (td.length) {
        anotherAnimal = trCount.length - 1;
        const tr = td.closest('tr');
        amount = parseInt(tr.find('.val')
          .text(), 10);
        console.warn({
          x,
          y,
        });
        // console.warn(amount);

        const vals = table.find('td.val');

        vals.each(function () {
          const val = parseInt($(this)
            .text());
          totalAnimal += val;
        });
      }

      if (amount > 0) {
        worksheet.cell(rowCounter, 1)
          .number(x);
        worksheet.cell(rowCounter, 2)
          .number(y);
        worksheet.cell(rowCounter, 3)
          .number(amount);
        worksheet.cell(rowCounter, 4)
          .number(anotherAnimal);
        worksheet.cell(rowCounter, 5)
          .number(hasCrocodile.length);
        worksheet.cell(rowCounter, 6)
          .number(hasTiger.length);
        worksheet.cell(rowCounter, 7)
          .number(totalAnimal);

        rowCounter += 1;
        workbook.write(file);
      }

      // save occupied
      const h1 = $('h1')
        .first()
        .text()
        .trim();

      if (!h1.includes('Unoccupied')) {
        uniquePositionOccupied.add({
          x,
          y,
        });
        jsonfile.writeFileSync(config.jsonFileOasisOccupied, uniquePositionOccupied.get());
      }
    })
    .catch((err) => {
      console.warn(err);
      process.exit(1);
    });

  sleep(util.randomIntFromInterval(config.delayMin, config.delayMax));
}
