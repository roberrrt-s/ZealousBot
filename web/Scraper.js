const cheerio = require('cheerio');
const fetch = require('node-fetch');

class Scraper {
	constructor(app) {
		this.app = app
		this.latest = 0;
	}

	init() {
		this.scrapeNews(news => {
			this.sendNews(news);
		});
	}

	async scrapeNews(cb) {
		try {
			let response = await fetch(`${this.app.CONFIG.NEWS_URL}?${Date.now()}`);
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
					// Looking back i'm so proud of this line O M G.
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
			news.reverse();
			this.app.client.channels.forEach(channel => {
				if(channel.name === this.app.CONFIG.NEWS) {
					channel.fetchMessages({ limit: 10 })
						.then(messages => {
							if(messages.size > 0) {
								let msgArr = messages.array().reverse();
								let last = msgArr[msgArr.length - 1].content;
								let foundIndex = null;

								news.map((item, i) => {
									if(last.indexOf(item) > 0) {
										foundIndex = i;
									}
									if(foundIndex !== null && i > foundIndex) {
										channel.send(`Hey @everyone, there's a new news item from Nexon: ${this.app.CONFIG.NEWS_PREFIX}${item}`);
									}
								});
							}
							else {
								// If the channel is empty, send the 10 latest items.
								news.forEach((item) => {
									channel.send(`${this.app.CONFIG.NEWS_PREFIX}${item}`)
								})
							}
						})
				}
			});
		}
	}
}

module.exports = {Scraper: Scraper};

