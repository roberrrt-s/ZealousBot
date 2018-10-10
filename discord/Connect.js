class Connect {
	constructor(CONFIG, client) {
		this.app;
		this.client = client;
		this.CONFIG = CONFIG;
	}

	// Handle local reference
	init(app, methods) {
		this.app = app;
		this.methods = methods;
	}

	login() {
		this.client.login(this.CONFIG.API_KEY)
	}
}

module.exports = {Connect: Connect};