const fs = require('fs');
const path = require('path');

class Customizer {
	constructor(app) {
		this.app = app;
	}
}

module.exports = {Customizer: Customizer};

