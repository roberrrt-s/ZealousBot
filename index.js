const CONFIG = require('./config/Config');

const Discord = require('discord.js');
const client = new Discord.Client();
const cron = require('cron').CronJob;

console.log(CONFIG)

const job = new cron(
	'0 */01 * * * *',
	function() {
		const d = new Date();
		console.log('test')
	},
	null,
	true,
	CONFIG.TIMEZONE
);

job.start();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  hello();
});

client.on('message', msg => {
	console.log(`${msg.author.username} says: ${msg.content}`);
})

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.on('message', msg => {
  if (msg.content === 'Zealous') {
    msg.reply("probably the best bloody guild you've joined so far mate.");
  }
});

client.login(CONFIG.API_KEY);


function hello() {
	let channel = client.channels.find(channel => channel.name === CONFIG.DEFAULT);
	channel.send('Hello world!')
}