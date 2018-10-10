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
		}
	}

	createChannel(guild) {
		console.log(`Did not find a channel on server ${guild.name}, creating one now...`)
		guild.createChannel(this.CONFIG.DEFAULT, 'text', [], 'I require my own channel for updates')
			.then(e => e.send('`Created a new channel in this server. Type +help for commands`'))
			.catch(console.error);
	}
}

module.exports = {Methods: Methods};