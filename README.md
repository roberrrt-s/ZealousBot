# ZealousBot &middot; [![GitHub license](https://img.shields.io/badge/license-GNU-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/roberrrt-s/ZealousBot/pulls)

ZealousBot is a handy Discord bot that creates and resides in it's own channel (`#zealousbot`). It has several cronjobs (chronological jobs) informing users about daily resets, news updates etc and also includes a list of commands to request specific MS2 details. See the list below for more information. Want to contribute / report bugs? Open up an issue or pull request.

I can be reached through Discord as `Preversive (Robert)#6611`.

## Installation (discord server owners)

 - [Invite the bot](https://discordapp.com/oauth2/authorize?&client_id=499249546585571357&scope=bot&permissions=8) to your own discord server
 - Grant the bot admin rights (don't worry, it has been trained to ignore everything except the following channels:)

 	- `#zealousbot`
 	- `#daily-guildquest`
 	- `#official-nexon-news` 

 _That's it!_

 I'm hosting the bot for you, and it serves all these servers at the same time.

## Commands

 - `+help` Returns an embed message with all commands and cronjobs
 - `+servertime` Returns the current server time in UTC
 - `+setdaily <daily guildquest>` Updates the daily guild quest channel
 - `+serverstatus` Pings the MS2 login server to check it's status

## Cronjobs 

- `dailyReset` every day except Friday at 0:00 UTC
- `weeklyReset` every Friday night at 0:00 UTC
- `guildQuestReset` every day at 0:00 UTC
- `checkNewsWebsite` every 30 minutes

## Personalization

ZealousBot creates his own channels, or will use your current channels with the names up top. To change those, you'll have to host your own version of ZealousBot (see Developers note). You can however, drag and drop the channels from the created category, and even delete the category entirely. You can remove the `#daily-guildquest` channel as well, but it will be recreated as soon as someone uses the `+setdaily` command. I'm working on a way to enable / disable certain features.

## TODO

- Create a way to ping the MS2 servers so you get a notification when the server is online.
- Add more logs to see who uses the server where etc etc. Restrict to 1 user id.
- Stop automatically creating channels for features, but rather use `+addchannel` if you want to 'subscribe' to functionalites.

## About / Developers note

When forking this repository, create a new `.env` file using the [`example.env`](./example.env) file provided. Please never upload keys or passwords to GitHub.
ZealousBot has been created using nodejs v9.11.1 and npm 6.4.1

 - This repository requires NodeJS and NPM.
 - Fork this repository
 - Create your own Config.js
 - Run `npm install`
 - Run `nodemon App.js`

I'm using [`Heroku`](http://heroku.com) to host ZealousBot. It's free and deploying goes through Github. Message me on discord if you need any help with setting up your own variant. (Don't change the copyright / credit section in +help please)

ZealousBot is [GNU licensed](./LICENSE).