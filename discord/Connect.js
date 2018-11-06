class Connect {
	constructor(app) {
		this.app = app
	}

	login() {
		this.app.client.login(this.app.CONFIG.API_KEY)
	}
}

module.exports = {Connect: Connect};