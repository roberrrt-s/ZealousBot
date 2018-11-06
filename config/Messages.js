const info = require('./../package.json');

const MESSAGES = {
	DAILY_RESET: 'The MapleStory 2 daily limit has been reset. You can now do your daily quests/raids/guildquests again',
	WEEKLY_RESET: 'The MapleStory 2 weekly limit has been reset. You can now do your daily quests/raids/guildquests again',
}

const COMMANDS = {
	HELP: {
		"description": "ZealousBot is a handy Discord bot that creates and resides in it's own channel `zealousbot`. It has several cronjobs informing users about daily resets etc and also includes a list of commands to request specific MS2 details. See the list below for more information. Want to contribute / report bugs? Please click this embedded message and create a new issue in the repository.",
		"color": 16777215,
		"timestamp": Date.now(),
		"footer": {
			"icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
			"text": `${info.name} ${info.version} | Created by ${info.author}`
		},
		"thumbnail": {
			"url": "https://cdn.discordapp.com/icons/438734880386449408/431d7c42aa812427fd7c280038c0aabd.webp"
		},
		"author": {
			"name": "ZealousBot for MapleStory 2",
			"url": "https://github.com/roberrrt-s/ZealousBot",
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
				"value": "Returns the current servertime (GMT/UTC+0)"
			},
			{
				"name": "+setdaily <mission>",
				"value": "Creates (if not found) a #daily-guildquest channel which sets one message at the top with the current daily guild quest objective. A new command resets the initial message"
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
			},
			{
				"name": "guildQuestReset",
				"value": "Resets the #daily-guildquest channel on a daily basis."
			},
			{
				"name": "checkNewsWebsite",
				"value": "Checks the MS2 global news section and sends the latest news if there's a new article"
			}
		]
	},
	UNKNOWN_COMMAND: ":no_entry_sign: Unrecognized command, please use `+help` more information",
	INVALID_ARGS: ":no_entry_sign: Command requires at least 1 argument",
	SERVER_TIME: "Current EU MapleStory2 server time:"
}

module.exports = {MESSAGES, COMMANDS};