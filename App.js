// Node modules
const Discord = require('discord.js');
const client = new Discord.Client();
const CronJob = require('cron').CronJob;

// Local config files
const CONFIG = require('./config/Config');

// Local imports
const Crons = require('./crons/Crons.js').Crons;
const Events = require('./discord/Events.js').Events;
const Connect = require('./discord/Connect.js').Connect;
const Methods = require('./discord/Methods.js').Methods;

// Local classes
const crons = new Crons(CONFIG, CronJob, client);
const events = new Events(client);
const connect = new Connect(CONFIG, client);
const methods = new Methods(CONFIG, client);

class App {
	constructor() {

		// Set local references to the App class for later use
		events.init(this, methods);
		connect.init(this, methods);
		crons.init(this, methods);
		methods.init(this);
		this.init();
	}

	// Initialize connection with Discord
	init() {
		console.log('Logging into discord servers');
		connect.login();
	}
}

// Initialize local app
const app = new App();