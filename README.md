# ZealousBot &middot; [![GitHub license](https://img.shields.io/badge/license-GNU-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/roberrrt-s/ZealousBot/pulls)

ZealousBot is a handy Discord bot that creates and resides in it's own channel (`zealousbot-channel`). It has several cronjobs (chronological jobs) informing users about daily resets, boss spawns etc and also includes a list of commands to request specific MS2 details. See the list below for more information. Want to contribute / report bugs? Open up an issue or pull request.

## Installation

Coming soon. (really soon)... it's not even 'published' yet.

## Commands

 - `+help` Returns an embed message with all commands and cronjobs
 - `+servertime` Returns the current server time in GMT
 - `+setdaily <arg>` Updates the daily guild quest channel

## Cronjobs 

- `dailyReset` every day except Friday at 0:00 GMT
- `weeklyReset` every Friday night at 0:00 GMT
- `guildQuestReset` every day at 0:00 GMT
- `checkNewsWebsite` every 30 minutes

## Personalization

More information regarding personalized info per channel. Coming soon

## TODO

- Create a way to ping the MS2 servers so you get a notification when the server is online
- Clean up the current structure inside the application

## About

When forking this repository, create a new `Config.js` file using the [`Config-example.js`](./config/Config-example.js) file provided. Please never upload keys or passwords to GitHub.
ZealousBot has been created using nodejs v9.11.1 and npm 6.4.1

 - This repository requires NodeJS and NPM.
 - Fork this repository
 - Create your own Config.js
 - Run `npm install`
 - Run `nodemon App.js`

ZealousBot is [GNU licensed](./LICENSE).