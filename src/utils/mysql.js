const mysql = require("mysql2");

const pool = 
	sqlPool = mysql.createPool({
		host: "127.0.0.1",
		user: "root",
		password: "",
		port: 3306,
		database: "user_db",
	});


module.exports = pool.promise();
