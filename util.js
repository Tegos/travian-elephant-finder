const randomIntFromInterval = function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

exports.randomIntFromInterval = randomIntFromInterval;