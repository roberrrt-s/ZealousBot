const cheerio = require('cheerio');
const fetch = require('node-fetch');

class Scraper {
	constructor(CONFIG) {
		this.app;
		this.latest = 0;
		this.random = 0;
		this.CONFIG = CONFIG;
	}

	init(app) {
		this.app = app;
		this.scrapeNews();

		setInterval(() => {
			this.random = Math.random();
		}, 8000)
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
}

module.exports = {Scraper: Scraper};

