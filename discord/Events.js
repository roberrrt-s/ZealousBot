class Events {
	constructor(CONFIG, client) {
		this.app;
		this.util;
		this.commands;
		this.CONFIG = CONFIG;
		this.client = client;
	}

	// Handle local reference
	init(app, methods, commands) {
		this.app = app;
		this.methods = methods;
		this.commands = commands;
		this.initEvents();
	}

	initEvents() {
		this.error();
		this.ready();
		this.guildCreate();
		this.message();
	}

	error() {
		this.client.on('error', msg => {
			console.log(msg);
		});
	}

	ready() {
		this.client.on('ready', () => {
			console.log(`Logged in as ${this.client.user.tag}`)
			this.methods.checkGuilds(this.client.guilds.array());
		});
	}

	guildCreate() {
		this.client.on('guildCreate', guild => {
			console.log('Added to a new guild!')
			this.methods.createChannel(guild);
		});
	}

	message() {
		this.client.on('message', msg => {
			// Always ignore bot messages
			if (msg.author.bot) {
				return false;
			}

			// Do not allow anyone to post in the news channel
			if (msg.channel.name === this.CONFIG.NEWS) {
				msg.delete(500);
				return false;
			}

			// Do not allow anyone to post in the GQ channel
			if (msg.channel.name === this.CONFIG.DAILYGQ) {
				msg.delete(500);
				return false;
			}

			// Always ignore non-zealousbot channels
			if (msg.channel.name !== this.CONFIG.DEFAULT) {
				return false;
			}

			// If the message is prefixed with a + we assume it's a command.
			if (msg.content.startsWith(this.CONFIG.PREFIX)) {
				this.commands.commandHandler(msg);
			} else {
				msg.delete(500) // Only I shall speak here, you peasent.
			}
		})
	}
}

module.exports = {Events: Events};