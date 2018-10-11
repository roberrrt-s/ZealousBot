const MESSAGES = {
	DAILY_RESET: 'The MapleStory 2 EU daily limit has been reset. You can now do your daily quests/raids/guildquests again',
	WEEKLY_RESET: 'The MapleStory 2 EU weekly limit has been reset. You can now do your daily quests/raids/guildquests again',
}

const COMMANDS = {
	HELP: {
		"description": "ZealousBot is a handy Discord-based bot that creates and resides in it's own channel `zealousbot-channel`. It has several cronjobs informing users about daily resets, boss spawns etc and also includes a list of commands to request specific MS2 details. See the list below for more information. Want to contribute / report bugs? Please click this embedded message and create a new issue in the repository.",
		"color": 16777215,
		"timestamp": Date.now(),
		"footer": {
			"icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
			"text": "ZealousBot 1.0 | Created by Robert Spier"
		},
		"thumbnail": {
			"url": "https://cdn.discordapp.com/icons/438734880386449408/431d7c42aa812427fd7c280038c0aabd.webp"
		},
		"author": {
			"name": "ZealousBot for MapleStory 2 (EU)",
			"url": "https://github.com/roberrrt-s",
			"icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
		},
		"fields": [
			{
				"name": "**COMMANDS**",
				"value": "List of commands:"
			},
			{
				"name": "+help",
				"value": "Displays the general bot information and list of commands"
			},
			{
				"name": "+servertime",
				"value": "Returns the current EU servertime (GMT/UTC+0)"
			},
			{
				"name": "**CRONJOBS**",
				"value": "List of chronological messages:"
			},
			{
				"name": "dailyReset",
				"value": "Sends a message whenever the daily reset happens"
			},
			{
				"name": "weeklyReset",
				"value": "Sends a message whenever the weekly reset happens"
			}
		]
	},
	UNKNOWN_COMMAND: "Unrecognized command, please use `+help` more information",
	SERVER_TIME: "Current EU MapleStory2 server time:"
}

module.exports = {MESSAGES, COMMANDS};