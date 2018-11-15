class Events {
	constructor(app) {
		this.app = app;
	}

	initEvents() {
		this.error();
		this.ready();
		this.guildCreate();
		this.message();
	}

	error() {
		this.app.client.on('error', msg => {
			console.log(msg);
		});
	}

	ready() {
		this.app.client.on('ready', () => {
			console.log(`Logged in as ${this.app.client.user.tag}`)
			this.app.client.user.setActivity(`${this.app.util.prettyTime()}`, { type: 'Watching' });
			this.app.methods.checkGuilds(this.app.client.guilds.array());
		});
	}

	guildCreate() {
		this.app.client.on('guildCreate', guild => {
			console.log('Added to a new guild!')
			this.app.methods.createChannel(guild);
		});
	}

	message() {
		this.app.client.on('message', msg => {
			// Always ignore bot messages
			if (msg.author.bot) {
				return false;
			}

			// Do not allow anyone to post in the news channel
			if (msg.channel.name === this.app.CONFIG.NEWS) {
				msg.delete(500);
				return false;
			}

			// Do not allow anyone to post in the GQ channel
			if (msg.channel.name === this.app.CONFIG.DAILYGQ) {
				msg.delete(500);
				return false;
			}

			// Always ignore non-zealousbot channels
			if (msg.channel.name !== this.app.CONFIG.DEFAULT) {
				return false;
			}

			// If the message is prefixed with a + we assume it's a command.
			if (msg.content.startsWith(this.app.CONFIG.PREFIX)) {
				this.app.commands.commandHandler(msg);
			} else {
				msg.delete(500) // Only I shall speak here, you peasent.
			}
		})
	}
}

module.exports = {Events: Events};