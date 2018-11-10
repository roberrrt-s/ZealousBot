const CONFIG = {
	API_KEY: process.env.API_KEY || null,
	NEWS_URL: 'http://maplestory2.nexon.net/en/news/all',
	NEWS_PREFIX: 'http://maplestory2.nexon.net',
	DEFAULT: 'zealousbot',
	CATEGORY: 'maplestory 2 zealous bot',
	DAILYGQ: 'daily-guildquest',
	NEWS: 'official-nexon-news',
	MS_LOGIN_IP: '127.0.0.1',
	MS_LOGIN_PORT: '80',
	TIMEZONE: 'Etc/UTC', // Always Etc/UTC because UTC
	PREFIX: '+'
}

module.exports = CONFIG;