class Events {
	constructor(client) {
		this.app;
		this.util;
		this.client = client;
	}

	// Handle local reference
	init(app, methods) {
		this.app = app;
		this.methods = methods
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
		this.client.on('guildCreate', () => {
			console.log('Added to a new guild!')
		});
	}

	message() {
		this.client.on('message', msg => {
			if (msg.author.bot) return;
			console.log('New message in channel!');
		});
	}
}

module.exports = {Events: Events};