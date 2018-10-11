const moment = require('moment');

class Crons {
	constructor(CONFIG, MESSAGES, CronJob, client) {
		this.app;
		this.util;
		this.CONFIG = CONFIG;
		this.MESSAGES = MESSAGES;
		this.CronJob = CronJob;
		this.client = client;
		this.dailyResetJob;
		this.weeklyResetJob;
	}

	init(app, methods, util) {
		this.app = app;
		this.methods = methods
		this.util = util;
	}

	dailyReset() {
		const dailyReset = new this.CronJob(
			'00 00 00 * * 1-4,6-7',
			() => {
				this.client.channels.find(channel => channel.name === this.CONFIG.DEFAULT).send(`${this.util.prettyDateTime()}: ${this.MESSAGES.DAILY_RESET}`);
			},
			null,
			true,
			this.CONFIG.TIMEZONE
		);
		dailyReset.start();
		this.dailyResetJob = dailyReset;
	}

	weeklyReset() {
		const weeklyReset = new this.CronJob(
			'00 00 00 * * 5',
			() => {
				this.client.channels.find(channel => channel.name === this.CONFIG.DEFAULT).send(`${this.util.prettyDateTime()}: ${this.MESSAGES.WEEKLY_RESET}`);
			},
			null,
			true,
			this.CONFIG.TIMEZONE
		);
		weeklyReset.start();
		this.weeklyResetJob = weeklyReset;
	}

}

module.exports = {Crons: Crons};