const moment = require('moment');

class Commands {
	constructor(CONFIG, COMMANDS, client) {
		this.app;
		this.util;
		this.client = client;
		this.CONFIG = CONFIG;
		this.COMMANDS = COMMANDS
	}

	// Handle local reference
	init(app, util) {
		this.app = app;
		this.util = util;
	}

	commandHandler(msg) {
		const args = msg.content.slice(this.CONFIG.PREFIX.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		switch(command) {
			case 'servertime':
			this.getServerTime(msg);
			break;
			default:
			this.throwError(command);
		}

	}

	getServerTime(msg) {
		msg.channel.send(`${this.COMMANDS.SERVER_TIME} ${moment().utc().format('HH:mm:ss')}`);
	}

	throwError() {
		console.log('Unknown command, try using +help');
	}
}

module.exports = {Commands: Commands};//