const cheerio = require('cheerio');
const fetch = require('node-fetch');

class Scraper {
	constructor(CONFIG) {
		this.app;
		this.latest = 0;
		this.CONFIG = CONFIG;
	}

	init(app) {
		this.app = app;
		this.scrapeNews();
	}

	async scrapeNews() {
		try {
			let response = await fetch(this.CONFIG.NEWS_URL);
			let html = await response.text();
			this.parseNews(html);
		} catch(e) {
			console.log(e);
		}
	}

	async parseNews(html) {
		try {
			const $ = await cheerio.load(html);
			$('.news-list > .news-item').map((i, el) => {
				const url = $(el).find('a').attr('href');
				const urlId = url.split('/');
				console.log(parseInt(urlId[4]));

				// If there's no latest id (this happens upon reinitializing)
				if (!this.latest.length && i === 0) {
					this.latest = parseInt(urlId[4])
				}

			});
			console.log(`Latest article ID: ${this.latest}`);
		} catch(e) {
			console.log(e)
		}
	}
}

module.exports = {Scraper: Scraper};

