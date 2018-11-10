const moment = require('moment');

class Util {
	prettyTime() {
		const now = moment().utc();
		return `[${now.format('HH:mm:ss')}] (UTC)`;
	}
	prettyDate() {
		const now = moment().utc();
		return `[${now.format('Do')} of ${now.format('MMMM')}]`;
	}
}

module.exports = {Util: Util};

