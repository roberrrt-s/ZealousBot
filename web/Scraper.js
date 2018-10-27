const cheerio = require('cheerio');
const fetch = require('node-fetch');

class Scraper {
	constructor(CONFIG, client) {
		this.app;
		this.latest = 0;
		this.client = client;
		this.CONFIG = CONFIG;
	}

	init(app) {
		this.app = app;
		this.scrapeNews();
	}

	onInit() {
		console.log('when initializing')
		this.scrapeNews(news => {
			this.sendNews(news);
		});
	}

	async scrapeNews(cb) {
		try {
			let response = await fetch(`${this.CONFIG.NEWS_URL}?${Date.now()}`);
			let html = await response.text();
			this.parseNews(cb, html);
		} catch(e) {
			console.log(e);
		}
	}

	async parseNews(cb, html) {
		try {
			const $ = await cheerio.load(html);
			let news = []
			$('.news-list > .news-item').map((i, el) => {
				const url = $(el).find('a').attr('href');
				const urlId = url.split('/');

				news.push(url);

				// If there's no latest id (this happens upon reinitializing)
				if (!this.latest.length && i === 0) {
					this.latest = parseInt(urlId[4])
				}

				// If there's a latest id set
				if(this.latest.length && i === 0) {
					// Replace the latest url ID since there is new news!
					this.latest === parseInt(urlId[4], 10) ? null : this.latest = parseInt(urlId(4), 10);
				}

			});

			console.log(`Latest article ID: ${this.latest}`);

			if(cb) {
				cb(news)
			}

		} catch(e) {
			console.log(e)
		}
	}

	sendNews(news) {
		if(news) {
			this.client.channels.forEach(channel => {
				if(channel.name === this.CONFIG.NEWS) {
					channel.fetchMessages({ limit: 1 })
						.then(messages => {
							if(messages.size) {
								messages.find(message => {
									// yadayada, do something with checking the past news updates and sending them
									let location = parseInt(message.content.indexOf(this.latest, 10));

									// If the latest message doesn't contain the id of the latest saved post:
									if (location === -1) {
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
	}
}

module.exports = {Scraper: Scraper};

