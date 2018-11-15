var tcpp = require('tcp-ping');

class Checker {
	constructor(app) {
		this.app = app
		// Assume the server is online
		this.serverStatus = true;
	}

	checkLoginServer(callback) {
		console.log('pinging server')
		tcpp.probe(this.app.CONFIG.MS_LOGIN_IP, this.app.CONFIG.MS_LOGIN_PORT, (err, status) => {
			callback(status)
		});

	}
}

module.exports = {Checker: Checker};