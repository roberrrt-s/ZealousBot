const CONFIG = {
	API_KEY: process.env.API_KEY || null,
	NEWS_URL: 'http://maplestory2.nexon.net/en/news/all',
	NEWS_PREFIX: 'http://maplestory2.nexon.net',
	DEFAULT: 'zealousbot',
	CATEGORY: 'maplestory 2 zealous bot',
	DAILYGQ: 'daily-guildquest',
	NEWS: 'official-nexon-news',
	//MS_LOGIN_IP: '54.230.129.59',
	//MS_LOGIN_PORT: '443',
	MS_LOGIN_IP: '18.194.181.99',
	MS_LOGIN_PORT: '30000',
	TIMEZONE: 'Etc/UTC', // Always Etc/UTC because UTC
	PREFIX: '+'
}

module.exports = CONFIG;

/*
MS_LOGIN_IP: '54.230.129.59', 443
MapleStory2.exe    8444    192.168.1.4    63993    54.230.129.30    443    -    -
MapleStory2.exe    8444    192.168.1.4    64174    52.28.43.65    30000    0    -
MapleStory2.exe    8444    192.168.1.4    64164    18.194.181.99    30000    -    -
MapleStory2.exe    14148   192.168.1.4    64856    18.185.194.20    30000    0    58

*/