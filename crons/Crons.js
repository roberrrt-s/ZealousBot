const moment = require('moment');
const CronJob = require('cron').CronJob;
const CronTime = require('cron').CronTime

class Crons {
	constructor(app) {
		this.app = app;

		this.testResetJob;
		this.dailyResetJob;
		this.weeklyResetJob;
		this.guildQuestResetJob;
		this.checkLoginServerJob;
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
				console.log(`${this.app.util.prettyDate()} - ${this.app.util.prettyTime()} | Sending daily reset messages`)
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
				console.log(`${this.app.util.prettyDate()} - ${this.app.util.prettyTime()} | Sending weekly reset messages`)
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
				console.log(`${this.app.util.prettyDate()} - ${this.app.util.prettyTime()} | Resetting daily guildquest channels`)
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
				console.log(`${this.app.util.prettyDate()} - ${this.app.util.prettyTime()} | Starting command to scrape NX news site`)
				this.app.scraper.scrapeNews(news => {
					this.app.scraper.sendNews(news);
				});
			},
			null,
			true,
			this.app.CONFIG.TIMEZONE
		);
		checkNewsWebsite.start();
		this.checkNewsWebsiteJob = checkNewsWebsite;
	}

	checkLoginServer() {
		const checkLoginServer = new CronJob(
			//'* * * * * *',
			'00 0,5,10,15,20,25,30,35,40,45,50,55 * * * *',
			() => {
				this.app.checker.checkLoginServer(status => {
					console.log(`${this.app.util.prettyDate()} - ${this.app.util.prettyTime()} | Checking login server`);
					console.log(`Server online: ${status}`)
					// If the server is online:
					if(status) {
						// If the server was offline:
						if(this.app.checker.serverStatus !== status) {
							this.app.client.channels.forEach(channel => {
								channel.name === this.app.CONFIG.DEFAULT ? channel.send(`${this.app.util.prettyTime()}: ${this.app.MESSAGES.SERVER_BACKONLINE}`) : null;
								this.checkLoginServerJob.setTime(new CronTime('00 0,5,10,15,20,25,30,35,40,45,50,55 * * * *'));
							});
						} 
					}

					// If the server is offline
					if(!status) {
						// If the server was online:
						if(this.app.checker.serverStatus !== status) {
							this.app.client.channels.forEach(channel => {
								channel.name === this.app.CONFIG.DEFAULT ? channel.send(`${this.app.util.prettyTime()}: ${this.app.MESSAGES.SERVER_OFFLINE}`) : null
								this.checkLoginServerJob.setTime(new CronTime('00 0,59 * * * *'));
							});
						}
					}

					this.serverStatus = status;
				})
			},
			null,
			true,
			this.app.CONFIG.TIMEZONE
		);
		checkLoginServer.start();
		this.checkLoginServerJob = checkLoginServer;
	}

}

module.exports = {Crons: Crons};