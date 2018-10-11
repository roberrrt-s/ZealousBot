const moment = require('moment');

class Util {

	// Requires a date object
	// Why not do this here? Simple. Async functionalities.
	prettyDateTime(date) {
		const now = moment().utc();
		return `[${now.format('HH:mm:ss')}]`;

	}
}

module.exports = {Util: Util};

