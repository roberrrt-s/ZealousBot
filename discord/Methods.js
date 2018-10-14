class Methods {
	constructor(CONFIG, client) {
		this.app;
		this.client = client;
		this.CONFIG = CONFIG;
	}

	// Handle local reference
	init(app) {
		this.app = app;
	}

	checkGuilds(guilds) {
		if(guilds) {
			guilds.map(guild => {
				!guild.channels.find(channel => channel.name === this.CONFIG.DEFAULT) ? this.createChannel(guild) : null;
			});

			this.app.initCrons();
		}
	}

	createChannel(guild) {
		// Extra check in case a channel with the same name already exists
		if (guild.channels.find(channel => channel.name === this.CONFIG.DEFAULT)) return;

		console.log(`Did not find a channel on server ${guild.name}, creating one now...`)
		guild.createChannel(this.CONFIG.DEFAULT, 'text', [], 'I require my own channel for updates')
			.then(e => e.send('Created a new channel in this server. Type `+help` for commands'))
			.catch(console.error);
	}

	checkGuildQuestChannel(guild, callback) {
		!guild.channels.find(channel => channel.name === this.CONFIG.DAILYGQ) ? this.createGuildQuestChannel(guild) : callback();
	}

	createGuildQuestChannel(guild) {
		console.log(`Did not find a channel on server ${guild.name}, creating one now...`)
		guild.createChannel(this.CONFIG.DAILYGQ, 'text', [], 'I require my own channel for updates')
			.then(callback())
			.catch(console.error);
	}

	truncateChannel(channel, callback) {
		channel.bulkDelete(100)
			.then(callback());
	}
}

module.exports = {Methods: Methods};