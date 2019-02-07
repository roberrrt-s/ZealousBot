const info = require('./../package.json');

const MESSAGES = {
	DAILY_RESET: 'The MapleStory 2 daily limit has been reset. You can now do your daily quests/raids/guildquests again',
	WEEKLY_RESET: 'The MapleStory 2 weekly limit has been reset. You can now do your daily quests/raids/guildquests again',
	PATCHNOTES: `\`ZealousBot v${info.version} is now live\` \n- Updates: Site news is now being checked every 10 minutes, Server interval changed to a single ping per minute, checking every 15 seconds when server is down.`,
	SERVER_TIME: "Current EU MapleStory2 server time:",
	SERVER_OFFLINE: "Hello @here, it seems the MS2 login server is offline, changing interval to checking every 15 seconds for updates!",
	SERVER_BACKONLINE: "Hello @@here, it seems the MS2 login server is now back online!",
	DAILY_GUILDQUESTS: {
		"wooden": "Open 10 wooden chests\n**Map:** North Royal Road (Spawn: xx:00, xx:25, xx:55)",
		"golden": "Open 3 golden chests\n**Map:** North Royal Road",
		"freshwater": "Catch 10 freshwater fish\n**Map:** Tria (Beginner I)",
		"foulwater": "Catch 10 foulwater fish\n**Map:** Evansville (Beginner I)",
		"lava": "Catch 10 lava fish\n**Map:** Lavaworks (Beginner IV)",
		"beasts": "Kill 100 Beasts\n**Map:** Ellin Grove",
		"insects": "Kill 100 Insects\n**Map:** The Deck Skatepark",
		"undead": "Kill 100 Undead\n**Map:** Goldus Pharmaceuticals",
		"divine": "Kill 100 Divine\n**Map:** Aurora Laboratory",
		"humanoid": "Kill 100 Humanoid\n**Map:** Karnif's Fang",
		"inanimate": "Kill 100 Inanimate\n**Map:** Slumberland",
		"plants": "Kill 100 Plants\n**Map:** Mounthill",
		"machines": "Kill 100 Machines\n**Map:** Ludi Station",
		"spirits": "Kill 100 Spirits\n**Map:** Misty Temple inside Razed Forest",
		"worldbosses": "Defeat 3 world bosses\n**Map:** Ludari Arena (xx:55), Lavender Island (xx:05), Nazkar Pyramid (xx:15)\n\n(On crowded times start at ch 1/2 and move two channels down each time, otherwise start at ch 1 and move one channel down)"
	}
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
				"name": "+serverstatus",
				"value": "Runs a check to see if the login server is reachable"
			},
			{
				"name": "+setdaily <mission>",
				"value": "Creates (if not found) a #daily-guildquest channel which sets one message at the top with the current daily guild quest objective. A new command resets the initial message"
			}
		]
	},
	UNKNOWN_COMMAND: ":no_entry_sign: Unrecognized command, please use `+help` more information",
	INVALID_ARGS: ":no_entry_sign: Command requires at least 1 argument",
	INVALID_DAILY: ":no_entry_sign: Incorrect argument, set a custom one using +setdaily <customised quest> (more than two arguments) or use one of the following options:",
}

module.exports = {MESSAGES, COMMANDS};