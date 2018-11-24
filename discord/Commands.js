const moment = require('moment');

class Commands {
	constructor(app) {
		this.app = app;
	}

	commandHandler(msg) {
		const args = msg.content.slice(this.app.CONFIG.PREFIX.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		switch(command) {
			case 'status':
				this.getStatus(msg);
				break;
			case 'patchnotes':
				this.sendPatchNotes(msg);
				break;
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

	getStatus(msg) {
		if(msg.author.id === '206829489387208704') {
			let guilds = this.app.client.guilds.array();
			let guildList = '';
			for(let i = 0; i < guilds.length; i++) {
				guildList = guildList + `\`- ${guilds[i].name} in region: ${guilds[i].region}\` \n`;
			}
			msg.channel.send(`\`${this.app.client.user.username} (${this.app.client.user.id})\` \n\`I'm currently connected to the following servers:\`\n \n${guildList}`).catch(console.error);
		}
	}

	sendPatchNotes(msg) {
		msg.delete(500)
		if(msg.author.id === '206829489387208704') {
			this.app.client.channels.forEach(channel => {
				if(channel.name === this.app.CONFIG.DEFAULT) {
					channel.send(this.app.MESSAGES.PATCHNOTES).catch(console.error);
				}
			});
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
		msg.channel.send(`${this.app.MESSAGES.SERVER_TIME} ${this.app.util.prettyTime()}`).catch(console.error);
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
			let daily;

			console.log(args)

			if (args.length === 1 && args[0] in this.app.MESSAGES.DAILY_GUILDQUESTS) {
				daily = this.app.MESSAGES.DAILY_GUILDQUESTS[args[0]];
			} else if(args.length > 1) {
				daily = args.join(' ');
			}
			else {
				let list = Object.keys(this.app.MESSAGES.DAILY_GUILDQUESTS);
				msg.channel.send(`${this.app.COMMANDS.INVALID_DAILY} ${list.join(', ')}. (+setdaily)`)
					.then(msg => {
						msg.delete(7500);
					})
					.catch(console.error);
					return false;
			}

			const channel = msg.guild.channels.find(channel => channel.name === this.app.CONFIG.DAILYGQ);
			this.app.methods.truncateChannel(channel, () => {
				channel.send(`${this.app.util.prettyDate()} Daily guild quest objective: \n${daily}`).catch(console.error);
			} );
		});

	}

	getServerStatus(msg) {
		this.app.checker.checkLoginServer(online => {
			if(online) {
				msg.channel.send(`Server appears to be online at ${this.app.util.prettyTime()}`).catch(console.error);
			} else {
				msg.channel.send(`Server appears to be offline [${moment().utc().format('HH:mm:ss')}]`).catch(console.error);
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