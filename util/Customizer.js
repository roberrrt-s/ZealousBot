const fs = require('fs');
const path = require('path');

class Customizer {
	constructor(app) {
		this.app = app;

		console.log(process.env.BOT_CHANNELS);

		if(Boolean(process.env.BOT_CHANNELS)) {
			process.env.BOT_CHANNELS = new Array();
		}

		let array = process.env.BOT_CHANNELS.split(",").map(Number);

		array.push(4);

		process.env.BOT_CHANNELS = array.toString();

		console.log(process.env.BOT_CHANNELS);
	}
}

module.exports = {Customizer: Customizer};

