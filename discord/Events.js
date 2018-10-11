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
		this.ready();
		this.guildCreate();
		this.message();
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
			if (msg.author.bot) return;

			// Always ignore non-zealousbot channels
			if (!msg.channel.name === this.CONFIG.DEFAULT) return;

			// If the message is prefixed with a + we assume it's a command.
			if (msg.content.startsWith(this.CONFIG.PREFIX)) {
				this.commands.commandHandler(msg);
			}
		});
	}
}

module.exports = {Events: Events};