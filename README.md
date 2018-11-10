# ZealousBot &middot; [![GitHub license](https://img.shields.io/badge/license-GNU-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/roberrrt-s/ZealousBot/pulls)

ZealousBot is a handy Discord bot that creates and resides in it's own channel (`#zealousbot`). It has several cronjobs (chronological jobs) informing users about daily resets, boss spawns etc and also includes a list of commands to request specific MS2 details. See the list below for more information. Want to contribute / report bugs? Open up an issue or pull request.

## Installation (discord server owners)

 - [Invite the bot](https://discordapp.com/oauth2/authorize?&client_id=499249546585571357&scope=bot&permissions=8) to your own discord server
 - Grant the bot admin rights (don't worry, it has been trained to ignore everything except the following channels:)

 	- `#zealousbot`
 	- `#daily-guildquest`
 	- `#official-nexon-news` 

 _That's it!_

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

## TODO

- Create a way to ping the MS2 servers so you get a notification when the server is online
- Add more logs to see who uses the server where etc etc. Restrict to 1 user id.

## About

When forking this repository, create a new `.env` file using the [`example.env`](./example.env) file provided. Please never upload keys or passwords to GitHub.
ZealousBot has been created using nodejs v9.11.1 and npm 6.4.1

 - This repository requires NodeJS and NPM.
 - Fork this repository
 - Create your own Config.js
 - Run `npm install`
 - Run `nodemon App.js`

ZealousBot is [GNU licensed](./LICENSE).