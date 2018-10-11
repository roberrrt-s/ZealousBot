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
			case 'help':
				this.getHelp(msg);
				break;
			case 'servertime':
				this.getServerTime(msg);
				break;
			default:
				this.throwError(msg, command);
		}

	}

	getHelp(msg) {
		msg.delete(500)
		msg.channel.send({
			embed: this.COMMANDS.HELP
		})
			.then(msg => {
				msg.delete(30000);
			})
			.catch(console.error);
	}

	getServerTime(msg) {
		msg.delete(500)
		msg.channel.send(`${this.COMMANDS.SERVER_TIME} ${moment().utc().format('HH:mm:ss')}`);
	}

	throwError(msg, command) {
		msg.delete(500)
		msg.channel.send(`${this.COMMANDS.UNKNOWN_COMMAND} (${command})`)
			.then(msg => {
				msg.delete(5000);
			})
			.catch(console.error);
	}
}

module.exports = {Commands: Commands};//