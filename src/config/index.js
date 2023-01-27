const { env } = require("process");
const dotenv = require("dotenv");
dotenv.config();

const port = env.PORT || 3000;
const host = env.HOST || "";
const user = env.SQL_USER || "";
const password = env.PASSWORD || "";
const sqlPort = env.SQL_PORT || "";
const sqlDatabase = env.SQL_DATABSE || "";

module.exports = {
	port,
	host,
	user,
	password,
	sqlPort,
	sqlDatabase,
};
