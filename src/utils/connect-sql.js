const mysql = require("mysql2");
const db = require("./mysql");

const createTabelsIfNotExists = async (connection) => {
	try {
		await connection.execute(`CREATE TABLE IF NOT EXISTS 
		Users (
			UserId int NOT NULL AUTO_INCREMENT,
			FirstName varchar(50) NOT NULL,
			LastName varchar(50) NOT NULL,
			Age int,
			Birthday varchar(10),
			Password varchar(500),
			Email varchar(50) NOT NULL,
			PRIMARY KEY (UserId)
		)`);

		await connection.execute(`INSERT INTO Users (FirstName, LastName, Age, Birthday, Password, Email)
		VALUES (?, ?, ?, ?, ?, ?);`, ["admin", "admin", 20, "", "admin", "admin@admin.com"]);

		await connection.execute(`CREATE TABLE IF NOT EXISTS 
		MobileNumbers (
			MobileId int NOT NULL AUTO_INCREMENT,
			Description varchar(50) NOT NULL,
			MobileNumber varchar(20) NOT NULL,
			PRIMARY KEY (MobileId)
		)`);

		await connection.execute(`CREATE TABLE IF NOT EXISTS 
		Users_mobile (
			Id int NOT NULL AUTO_INCREMENT,
			MobileId int NOT NULL,
			UserId int NOT NULL,
			PRIMARY KEY (Id),
			FOREIGN KEY(MobileId) REFERENCES MobileNumbers(MobileId), 		
			FOREIGN KEY(UserId) REFERENCES Users(UserId)
		)`);

		await connection.execute(`CREATE TABLE IF NOT EXISTS 
		Hobbies (
			HobbyId int NOT NULL AUTO_INCREMENT,
			Hobby varchar(100) NOT NULL UNIQUE,
			PRIMARY KEY (HobbyId)
		)`);

		await connection.execute(`CREATE TABLE IF NOT EXISTS 
		Users_hobbies (
			Id int NOT NULL AUTO_INCREMENT,
			HobbyId int NOT NULL,
			UserId int NOT NULL,
			PRIMARY KEY (Id),
			FOREIGN KEY(HobbyId) REFERENCES Hobbies(HobbyId), 		
			FOREIGN KEY(UserId) REFERENCES Users(UserId)
		)`);
	} catch (error) {
		console.log("ERROR while creating new Tables", error);
	}
};

const connectMySQL = async () => {
	const initialConnection = mysql.createPool({
		host: "127.0.0.1",
		user: "root",
		password: "",
		port: 3306,
	});

	await initialConnection.execute(`CREATE DATABASE IF NOT EXISTS user_db`);

	await createTabelsIfNotExists(db);
	//create init tables
};

module.exports = {
	connectMySQL,
};
