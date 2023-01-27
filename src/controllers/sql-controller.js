const mysql = require("../utils/mysql");

const healthCheck = async (req, res) => {
	res.status(200).send("Server is running");
};

const addNewUser = async (req, res) => {
	const user = req.body;

	const password = `${user.firstName}@123`;

	try {
		const [rowData, _] = await mysql.query(
			`INSERT INTO Users (FirstName, LastName, Age, Birthday, Password, Email)
			VALUES (?, ?, ?, ?, ?, ?);`,
			[
				`${user.firstName}`,
				`${user.lastName}`,
				parseInt(user.age),
				`${user.birthday}`,
				`${password}`,
				`${user.email}`,
			]
		);

		for (const keyValueArray of user.mobileNumbers) {
			const [addedMobileNumberIndex, _] = await mysql.query(
				`INSERT INTO MobileNumbers(Description, MobileNumber) VALUES (?, ?);`,
				[...keyValueArray]
			);

			await mysql.query(
				`INSERT INTO Users_mobile(MobileId, UserId) VALUES (?, ?);`,
				[addedMobileNumberIndex.insertId, rowData.insertId]
			);
		}
	} catch (error) {
		res.status(500).send(`User not added,  ERROR: ${error}`);
		return;
	}

	res.status(200).send("OK");
};

const addHobbies = async (req, res) => {
	const reqBody = req.body;

	let query = "";
	const hobbies = [];

	reqBody.hobbies.forEach((hobby, index) => {
		hobbies.push(hobby);
		const appendQuery = `
		SELECT HobbyId FROM Hobbies
		WHERE Hobby = ? `;
		query += appendQuery;
		reqBody.hobbies.length > index + 1 ? (query += " UNION ") : "";
	});

	try {
		let filterData;
		const [data, _] = await mysql.query(query, hobbies);
		filterData = data;

		if (filterData.length != hobbies.length) {
			// if hobby is not on the databse Add the hobbies into databse
			await mysql.query(`INSERT IGNORE INTO Hobbies(Hobby) VALUES ?;`, [
				hobbies.map((hobby) => [hobby]),
			]);

			// retry to get the hobbies in database
			const [data, _] = await mysql.query(query, hobbies);
			filterData = data;
		}

		await mysql.query(`INSERT INTO Users_hobbies (UserId, HobbyId) VALUES ?;`, [
			filterData.map((hobby) => [reqBody.userId, hobby.HobbyId]),
		]);
	} catch (error) {
		res.status(500).send(`User Hobbies not added,  ERROR: ${error}`);
		return;
	}
	res.status(200).send("OK");
};

const fetchAllUsers = async (req, res) => {
	const [users, _] = await mysql.query(` SELECT * FROM Users`);

	const allUsers = [];
	for (const user of users) {
		const [usersArray, _1] = await mysql.query(
			`SELECT *
				FROM Users
				WHERE Users.UserId = ?;
			`,
			[user.UserId]
		);

		const userObj = usersArray[0];
		const Hobb = [];
		const userMobileNumbers = [];

		for (const user of usersArray) {
			const [userHobby, _1] = await mysql.query(
				`SELECT *
					FROM Users
					JOIN Users_hobbies  ON Users.UserId = Users_hobbies.UserId
					JOIN Hobbies ON Users_hobbies.HobbyId = Hobbies.HobbyId
					WHERE Users.UserId = ?;
				`,
				[user.UserId]
			);

			for (const hobby of userHobby) {
				Hobb.indexOf(hobby.Hobby) === -1 ? Hobb.push(hobby.Hobby) : "";
			}

			const [usersMobiles, _2] = await mysql.query(
				`SELECT *
					FROM Users
					JOIN Users_mobile ON Users.UserId = Users_mobile.UserId
					JOIN MobileNumbers ON Users_mobile.MobileId = MobileNumbers.MobileId
					WHERE Users.UserId = ?;
				`,
				[user.UserId]
			);

			for (const mobile of usersMobiles) {
				const mobileNumber = {
					description: `${mobile.Description}`,
					mobileNumber: `${mobile.MobileNumber}`,
				};

				if (userMobileNumbers.length == 0) {
					userMobileNumbers.push(mobileNumber);
				}

				const numberExistInArray = userMobileNumbers.findIndex(
					(numberDetails) =>
						numberDetails.mobileNumber === mobileNumber.mobileNumber
				);

				numberExistInArray == -1 ? userMobileNumbers.push(mobileNumber) : "";
			}
		}

		const {
			Id,
			HobbyId,
			Hobby,
			MobileId,
			Description,
			MobileNumber,
			...newUser
		} = { ...userObj, Hobbies: Hobb, MobileNumbers: userMobileNumbers };

		allUsers.push(newUser);
	}

	res.status(200).send({
		users: allUsers,
	});
};

const login = async (req, res) => {
	const body = req.body;
	// vnvgnvgn@tj
	// tharuka@123

	const [usersArray, _1] = await mysql.query(
		`SELECT *
			FROM Users
			WHERE Users.Email = ? AND Users.Password = ?;
		`,
		[body.userName, body.password]
	);

	if (usersArray.length) {
		res.status(200).send();
		return;
	} else {
		res.status(401).send();
		return;
	}
};

module.exports = {
	healthCheck,
	addNewUser,
	addHobbies,
	fetchAllUsers,
	login,
};
