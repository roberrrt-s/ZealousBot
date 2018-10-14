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
				!guild.channels.find(channel => channel.name === this.CONFIG.DEFAULT) ? this.createCategory(guild) : null;
				!guild.channels.find(channel => channel.name === this.CONFIG.DEFAULT) ? this.createChannel(guild) : null;
			});

			this.app.initCrons();
		}
	}

	createCategory(guild) {
		if (guild.channels.find(channel => channel.name === this.CONFIG.CATEGORY)) return;
		guild.createChannel(this.CONFIG.CATEGORY, 'category', [], 'I require my own category for updates')
			.catch(console.error);
	}

	createChannel(guild) {
		// Extra check in case a channel with the same name already exists
		if (guild.channels.find(channel => channel.name === this.CONFIG.DEFAULT)) return;

		console.log(`Did not find a channel on server ${guild.name}, creating one now...`)
		guild.createChannel(this.CONFIG.DEFAULT, 'text', [], 'I require my own channel for updates')
			.then(channel => {
				channel.setParent(channel.guild.channels.find(channel => channel.name === this.CONFIG.CATEGORY));
				channel.send('Created a new channel in this server. Type `+help` for commands');
			})
			.catch(console.error);
	}

	checkGuildQuestChannel(guild, callback) {
		!guild.channels.find(channel => channel.name === this.CONFIG.DAILYGQ) ? this.createGuildQuestChannel(guild, callback) : callback();
	}

	createGuildQuestChannel(guild, callback) {
		console.log(`Did not find a channel on server ${guild.name}, creating one now...`)

		guild.createChannel(this.CONFIG.DAILYGQ, 'text', [], 'I require my own channel for updates')
			.then(channel => {
				channel.setParent(channel.guild.channels.find(channel => channel.name === this.CONFIG.CATEGORY));
				callback()
			})
			.catch(console.error);
	}

	truncateChannel(channel, callback) {
		channel.bulkDelete(100)
			.then(callback());
	}
}

module.exports = {Methods: Methods};