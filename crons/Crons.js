const moment = require('moment');

class Crons {
	constructor(CONFIG, MESSAGES, CronJob, client) {
		this.app;
		this.util;
		this.CONFIG = CONFIG;
		this.MESSAGES = MESSAGES;
		this.CronJob = CronJob;
		this.client = client;
		this.testResetJob;
		this.dailyResetJob;
		this.weeklyResetJob;
		this.guildQuestResetJob;
		this.checkNewsWebsite;
	}

	init(app, methods, util, scraper) {
		this.app = app;
		this.methods = methods
		this.util = util;
		this.scraper = scraper;
	}

	testReset() {
		const testReset = new this.CronJob(
			'* * * * * *',
			() => {
				this.client.channels.forEach(channel => {
					console.log('testing');
					//channel.name === this.CONFIG.DEFAULT ? channel.send(`${this.util.prettyTime()}: ${this.MESSAGES.DAILY_RESET}`) : null
				});
			},
			null,
			true,
			this.CONFIG.TIMEZONE
		);
		testReset.start();
		this.testResetJob = testReset;
	}

	dailyReset() {
		const dailyReset = new this.CronJob(
			'01 00 00 * * 0-4,6',
			() => {
				this.client.channels.forEach(channel => {
					channel.name === this.CONFIG.DEFAULT ? channel.send(`${this.util.prettyTime()}: ${this.MESSAGES.DAILY_RESET}`) : null
				});
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
			'01 00 00 * * 5',
			() => {
				this.client.channels.forEach(channel => {
					channel.name === this.CONFIG.DEFAULT ? channel.send(`${this.util.prettyTime()}: ${this.MESSAGES.WEEKLY_RESET}`) : null
				});
			},
			null,
			true,
			this.CONFIG.TIMEZONE
		);
		weeklyReset.start();
		this.weeklyResetJob = weeklyReset;
	}

	guildQuestReset() {
		const guildQuestReset = new this.CronJob(
			'01 00 00 * * *',
			() => {
				this.client.channels.forEach(channel => {
					if(channel.name === this.CONFIG.DAILYGQ) {
						this.methods.truncateChannel(channel, () => {
							channel.send(`Nobody has set the daily guild quest objective yet, update it in the #${this.CONFIG.DEFAULT} channel using ${this.CONFIG.PREFIX}setdaily`)
						})
					}
				});
			},
			null,
			true,
			this.CONFIG.TIMEZONE
		);
		guildQuestReset.start();
		this.guildQuestResetJob = guildQuestReset;
	}

	checkNewsWebsite() {
		const checkNewsWebsite = new this.CronJob(
			'00 * * * * *',
			() => {
				console.log('i run')

				this.scraper.scrapeNews(news => {
					if(news) {
						this.client.channels.forEach(channel => {
							if(channel.name === this.CONFIG.NEWS) {
								this.methods.truncateChannel(channel, () => {
									news.forEach((item) => {
										channel.send(`${this.CONFIG.NEWS_PREFIX}${item}`)
									})
								});
							}
						});
					}
				});
				// this.client.channels.forEach(channel => {
				// 	this.methods.truncateChannel(channel, () => {
				// 		channel.send(`Nobody has set the daily guild quest objective yet, update it in the #${this.CONFIG.DEFAULT} channel using ${this.CONFIG.PREFIX}setdaily`)
				// 	})
				// });
			},
			null,
			true,
			this.CONFIG.TIMEZONE
		);
		checkNewsWebsite.start();
		this.checkNewsWebsite = checkNewsWebsite;
	}

}

module.exports = {Crons: Crons};