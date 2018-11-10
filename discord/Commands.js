const moment = require('moment');

class Commands {
	constructor(app) {
		this.app = app;
	}

	commandHandler(msg) {
		const args = msg.content.slice(this.app.CONFIG.PREFIX.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		switch(command) {
			case 'help':
				this.getHelp(msg);
				break;
			case 'servertime':
				this.getServerTime(msg);
				break;
			case 'setdaily':
				this.setDailyGuildQuest(msg, command, args);
				break;
			case 'serverstatus':
				this.getServerStatus(msg);
				break;
			default:
				this.throwError(msg, command);
		}

	}

	getHelp(msg) {
		msg.delete(500)
		msg.channel.send({
			embed: this.app.COMMANDS.HELP
		})
			.then(msg => {
				msg.delete(45000);
			})
			.catch(console.error);
	}

	getServerTime(msg) {
		msg.channel.send(`${this.app.COMMANDS.SERVER_TIME} ${this.app.util.prettyTime()}`);
	}

	setDailyGuildQuest(msg, command, args) {
		if(!args.length) {
			msg.channel.send(`${this.app.COMMANDS.INVALID_ARGS} (${this.app.CONFIG.PREFIX}${command})`)
				.then(msg => {
				msg.delete(5000);
			})
			.catch(console.error);

			return false;
		}

		this.app.methods.checkGuildQuestChannel(msg.guild, () => {
			const daily = args.join(' ');
			const channel = msg.guild.channels.find(channel => channel.name === this.app.CONFIG.DAILYGQ);
			this.app.methods.truncateChannel(channel, () => {
				channel.send(`${this.app.util.prettyDate()} Daily guild quest objective: \n${daily}`);
			} );
		});

	}

	getServerStatus(msg) {
		this.app.checker.checkLoginServer(online => {
			if(online) {
				msg.channel.send(`Server appears to be online at ${this.app.util.prettyTime()}`);
			} else {
				msg.channel.send(`Server appears to be offline [${moment().utc().format('HH:mm:ss')}]`);
			}
		})
	}

	throwError(msg, command) {
		msg.delete(500)
		msg.channel.send(`${this.app.COMMANDS.UNKNOWN_COMMAND} (${this.app.CONFIG.PREFIX}${command})`)
			.then(msg => {
				msg.delete(5000);
			})
			.catch(console.error);
	}
}

module.exports = {Commands: Commands};//