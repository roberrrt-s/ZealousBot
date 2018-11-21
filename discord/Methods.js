class Methods {
	constructor(app) {
		this.app = app;
	}

	checkGuilds(guilds) {
		if(guilds) {
			guilds.map(guild => {
				!guild.channels.find(channel => channel.name === this.app.CONFIG.CATEGORY) ? this.createCategory(guild) : null;
				!guild.channels.find(channel => channel.name === this.app.CONFIG.DEFAULT) ? this.createChannel(guild) : null;
				!guild.channels.find(channel => channel.name === this.app.CONFIG.NEWS) ? this.createNews(guild) : null;
			});

			this.app.scraper.init();
			this.app.initCrons();
		}
	}

	createNews(guild) {
		// Extra check in case a channel with the same name already exists
		if (guild.channels.find(channel => channel.name === this.app.CONFIG.NEWS)) return;

		console.log(`Did not find a channel on server ${guild.name}, creating one now...`)
		guild.createChannel(this.app.CONFIG.NEWS, 'text', [], 'I require my own channel for news')
			.then(channel => {
				channel.setParent(channel.guild.channels.find(channel => channel.name === this.app.CONFIG.CATEGORY));
				this.app.scraper.scrapeNews(news => {
					this.app.scraper.sendNews(news);
				});	
			})
			.catch(console.error);
	}

	createCategory(guild) {
		if (guild.channels.find(channel => channel.name === this.app.CONFIG.CATEGORY)) return;
		guild.createChannel(this.app.CONFIG.CATEGORY, 'category', [], 'I require my own category for updates')
			.catch(console.error);
	}

	createChannel(guild) {
		// Extra check in case a channel with the same name already exists
		if (guild.channels.find(channel => channel.name === this.app.CONFIG.DEFAULT)) return;

		console.log(`Did not find a channel on server ${guild.name}, creating one now...`)
		guild.createChannel(this.app.CONFIG.DEFAULT, 'text', [], 'I require my own channel for updates')
			.then(channel => {
				channel.setParent(channel.guild.channels.find(channel => channel.name === this.app.CONFIG.CATEGORY));
				channel.send('Created a new channel in this server. Type `+help` for commands').catch(console.error);
			})
			.catch(console.error);
	}

	checkGuildQuestChannel(guild, callback) {
		!guild.channels.find(channel => channel.name === this.app.CONFIG.DAILYGQ) ? this.createGuildQuestChannel(guild, callback) : callback();
	}

	createGuildQuestChannel(guild, callback) {
		console.log(`Did not find a channel on server ${guild.name}, creating one now...`)

		guild.createChannel(this.app.CONFIG.DAILYGQ, 'text', [], 'I require my own channel for updates')
			.then(channel => {
				channel.setParent(channel.guild.channels.find(channel => channel.name === this.app.CONFIG.CATEGORY));
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