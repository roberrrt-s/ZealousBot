const moment = require('moment');
const CronJob = require('cron').CronJob;

class Crons {
	constructor(app) {
		this.app = app;
		
		this.testResetJob;
		this.dailyResetJob;
		this.weeklyResetJob;
		this.guildQuestResetJob;
	}

	testReset() {
		const testReset = new CronJob(
			'* * * * * *',
			() => {
				this.app.client.channels.forEach(channel => {
					console.log('testing');
					//channel.name === this.app.CONFIG.DEFAULT ? channel.send(`${this.app.util.prettyTime()}: ${this.app.MESSAGES.DAILY_RESET}`) : null
				});
			},
			null,
			true,
			this.app.CONFIG.TIMEZONE
		);
		testReset.start();
		this.testResetJob = testReset;
	}

	dailyReset() {
		const dailyReset = new CronJob(
			'01 00 00 * * 0-4,6',
			() => {
				this.app.client.channels.forEach(channel => {
					channel.name === this.app.CONFIG.DEFAULT ? channel.send(`${this.app.util.prettyTime()}: ${this.app.MESSAGES.DAILY_RESET}`) : null
				});
			},
			null,
			true,
			this.app.CONFIG.TIMEZONE
		);
		dailyReset.start();
		this.dailyResetJob = dailyReset;
	}

	weeklyReset() {
		const weeklyReset = new CronJob(
			'01 00 00 * * 5',
			() => {
				this.app.client.channels.forEach(channel => {
					channel.name === this.app.CONFIG.DEFAULT ? channel.send(`${this.app.util.prettyTime()}: ${this.app.MESSAGES.WEEKLY_RESET}`) : null
				});
			},
			null,
			true,
			this.app.CONFIG.TIMEZONE
		);
		weeklyReset.start();
		this.weeklyResetJob = weeklyReset;
	}

	guildQuestReset() {
		const guildQuestReset = new CronJob(
			'01 00 00 * * *',
			() => {
				this.app.client.channels.forEach(channel => {
					if(channel.name === this.app.CONFIG.DAILYGQ) {
						this.app.methods.truncateChannel(channel, () => {
							channel.send(`Nobody has set the daily guild quest objective yet, update it in the #${this.app.CONFIG.DEFAULT} channel using ${this.app.CONFIG.PREFIX}setdaily`)
						})
					}
				});
			},
			null,
			true,
			this.app.CONFIG.TIMEZONE
		);
		guildQuestReset.start();
		this.guildQuestResetJob = guildQuestReset;
	}

	checkNewsWebsite() {
		const checkNewsWebsite = new CronJob(
			'00 00,30 0-23 * * *',
//			'00 00 00 * * * *',
			() => {
				this.app.scraper.scrapeNews(news => {
					this.app.scraper.sendNews(news);
				});
			},
			null,
			true,
			this.app.CONFIG.TIMEZONE
		);
		checkNewsWebsite.start();
		this.checkNewsWebsite = checkNewsWebsite;
	}

}

module.exports = {Crons: Crons};