const moment = require('moment');

class Util {
	prettyTime() {
		const now = moment().utc();
		return `[${now.format('HH:mm:ss')}]`;
	}
	prettyDate() {
		const now = moment().utc();
		return `[${now.format('Do')} of ${now.format('MMMM')}]`;
	}
}

module.exports = {Util: Util};

