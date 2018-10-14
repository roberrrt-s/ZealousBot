# ZealousBot &middot; [![GitHub license](https://img.shields.io/badge/license-GNU-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/roberrrt-s/ZealousBot/pulls)

ZealousBot is a handy Discord bot that creates and resides in it's own channel (`zealousbot-channel`). It has several cronjobs (chronological jobs) informing users about daily resets, boss spawns etc and also includes a list of commands to request specific MS2 details. See the list below for more information. Want to contribute / report bugs? Open up an issue or pull request.

## Installation

Coming soon.

## Commands

 - `+help`
 - `+servertime`
 - `+setdaily`

## Cronjobs 

- `dailyReset`
- `weeklyReset`
- `guildQuestReset`

## About

When forking this repository, create a new `Config.js` file using the [`Config-example.js`](./config/Config-example.js) file provided. Please never upload keys or passwords to GitHub.
ZealousBot has been created using nodejs v9.11.1 and npm 6.4.1

 - This repository requires NodeJS and NPM.
 - Fork this repository
 - Create your own Config.js
 - Run `npm install`
 - Run `nodemon App.js`

ZealousBot is [GNU licensed](./LICENSE).