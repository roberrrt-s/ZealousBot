// Initialize redis + client
const redis = require('redis');

class Database {
	constructor(app) {
		this.app = app;
	}

	start(cb) {
		// const db = redis.createClient();

		// db.on("error", function (err) {
		// 	console.log("Error " + err);
		// });

		// if(cb) {
		// 	cb(db);
		// }
	}
}

module.exports = {Database: Database};

