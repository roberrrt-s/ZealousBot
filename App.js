// Environment
require('dotenv').config()

// Initialize discord + client
const Discord = require('discord.js');
const client = new Discord.Client();

// Local config files
const CONFIG = require('./config/Config');
const {MESSAGES, COMMANDS} = require('./config/Messages');

// Local imports
const Crons = require('./crons/Crons.js').Crons;
const Events = require('./discord/Events.js').Events;
const Connect = require('./discord/Connect.js').Connect;
const Methods = require('./discord/Methods.js').Methods;
const Commands = require('./discord/Commands.js').Commands;
const Scraper = require('./web/Scraper.js').Scraper;
const Checker = require('./web/Checker').Checker;
const Util = require('./util/Util.js').Util;

class App {
	constructor() {
		// Set the client inside the app
		this.client = client;

		this.CONFIG = CONFIG;
		this.MESSAGES = MESSAGES;
		this.COMMANDS = COMMANDS;

		// Set all application modules inside the main app
		this.crons = new Crons(this);
		this.events = new Events(this);
		this.connect = new Connect(this);
		this.methods = new Methods(this);
		this.commands = new Commands(this);
		this.scraper = new Scraper(this);
		this.checker = new Checker(this);
		this.util = new Util();

		this.init();
	}

	// Initialize connection with Discord
	init() {
		console.log('Logging into discord servers');
		this.events.initEvents();
		this.connect.login();
	}

	initCrons() {
		// this.crons.testReset();
		this.crons.updateOwnTime();
		this.crons.dailyReset();
		this.crons.weeklyReset();
		this.crons.guildQuestReset();
		this.crons.checkNewsWebsite();
		this.crons.checkLoginServer();
	}
}

// Initialize local app
const app = new App();