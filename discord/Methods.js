class Methods {
	constructor(CONFIG, client) {
		this.app;
		this.client = client;
		this.CONFIG = CONFIG;
	}

	// Handle local reference
	init(app, scraper) {
		this.app = app;
		this.scraper = scraper
	}

	checkGuilds(guilds) {
		if(guilds) {
			guilds.map(guild => {
				!guild.channels.find(channel => channel.name === this.CONFIG.CATEGORY) ? this.createCategory(guild) : null;
				!guild.channels.find(channel => channel.name === this.CONFIG.DEFAULT) ? this.createChannel(guild) : null;
				!guild.channels.find(channel => channel.name === this.CONFIG.NEWS) ? this.createNews(guild) : null;
			});

			this.scraper.onInit();
			this.app.initCrons();
		}
	}

	createNews(guild) {
		// Extra check in case a channel with the same name already exists
		if (guild.channels.find(channel => channel.name === this.CONFIG.NEWS)) return;

		console.log(`Did not find a channel on server ${guild.name}, creating one now...`)
		guild.createChannel(this.CONFIG.NEWS, 'text', [], 'I require my own channel for news')
			.then(channel => {
				channel.setParent(channel.guild.channels.find(channel => channel.name === this.CONFIG.CATEGORY));
				this.scraper.scrapeNews(news => {
					this.scraper.sendNews(news);
				});	
			})
			.catch(console.error);
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
		.then(() => {
			if (callback) {
				callback()
			}
		});
	}
}

module.exports = {Methods: Methods};