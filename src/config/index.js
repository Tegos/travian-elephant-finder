const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

export default {
  cookie: fs.readFileSync('cookie.txt'),
  travian: {
    server: process.env.TRAVIAN_SERVER,
  },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36',
  coordinates: {
    minX: process.env.MIN_X,
    minY: process.env.MIN_Y,
    maxX: process.env.MAX_X,
    maxY: process.env.MAX_Y,
    startX: process.env.START_X,
    startY: process.env.START_Y,
  },
  delay: {
    min: process.env.DELAY_MIN,
    max: process.env.DELAY_MAX
  },
  jsonFile: {
    oasis: 'data/oasis.json',
    oasisOccupied: 'data/oasis-occupied.json',
  }
};
