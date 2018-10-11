// Node modules
const Discord = require('discord.js');
const client = new Discord.Client();
const CronJob = require('cron').CronJob;

// Local config files
const CONFIG = require('./config/Config');
const {MESSAGES, COMMANDS} = require('./config/Messages');

// Local imports
const Crons = require('./crons/Crons.js').Crons;
const Events = require('./discord/Events.js').Events;
const Connect = require('./discord/Connect.js').Connect;
const Methods = require('./discord/Methods.js').Methods;
const Commands = require('./discord/Commands.js').Commands;
const Util = require('./util/Util.js').Util;

// Local classes
const crons = new Crons(CONFIG, MESSAGES, CronJob, client);
const events = new Events(CONFIG, client);
const connect = new Connect(CONFIG, client);
const methods = new Methods(CONFIG, client);
const commands = new Commands(CONFIG, COMMANDS, client);
const util = new Util();

// App, could also be named controller but whatever.
class App {
	constructor() {

		// Set local references to the App class for later use
		events.init(this, methods, commands);
		connect.init(this, methods);
		crons.init(this, methods, util);
		methods.init(this);
		commands.init(this, util)
		this.init();
	}

	// Initialize connection with Discord
	init() {
		console.log('Logging into discord servers');
		connect.login();
	}

	initCrons() {
		crons.dailyReset();
		crons.weeklyReset();
	}
}

// Initialize local app
const app = new App();