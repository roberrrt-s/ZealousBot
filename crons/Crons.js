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
			'00,20,40 * * * * *',
			() => {
				this.scraper.scrapeNews(news => {
					if(news) {
						this.client.channels.forEach(channel => {
							if(channel.name === this.CONFIG.NEWS) {
								channel.fetchMessages({ limit: 1 })
									.then(messages => {
										if(messages.size) {
											messages.find(message => {
												// yadayada, do something with checking the past news updates and sending them

												console.log(news[0]);
												console.log(this.scraper.latest);
												console.log(this.scraper.random);

												// If the latest message doesn't contain the id of the latest saved post:
												if (parseInt(message.content.indexOf(this.scraper.latest, 10) < 0)) {
													console.log('sending')
													channel.send(`${this.CONFIG.NEWS_PREFIX}${news[0]}`);
												}
											});
										}
										else {
											// If the channel is empty, send the 10 latest items.
											news.reverse();
											news.forEach((item) => {
												channel.send(`${this.CONFIG.NEWS_PREFIX}${item}`)
											})
										}
									})
							}
						});
					}
				});
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