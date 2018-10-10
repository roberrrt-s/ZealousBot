class Crons {
	constructor(CONFIG, CronJob, client) {
		this.app;
		this.CONFIG = CONFIG;
		this.CronJob = CronJob;
		this.client = client;
	}

	init(app, methods) {
		this.app = app;
		this.methods = methods
	}

	sayHello() {
		console.log("Nice to meet you!");
	}
}

module.exports = {Crons: Crons};