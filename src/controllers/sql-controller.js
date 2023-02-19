const healthCheck = async (req, res) => {
	res.status(200).send("Server is running");
};

const addNewUser = async (req, res) => {
	//const user = req.body;

	// const password = `${user.firstName}@123`;

	// try {
		
	// 	}
	// } catch (error) {
	// 	res.status(500).send(`User not added,  ERROR: ${error}`);
	// 	return;
	// }

	// res.status(200).send("OK");
};

const addHobbies = async (req, res) => {
	
};

const fetchAllUsers = async (req, res) => {
	

	// res.status(200).send({
	// 	users: allUsers,
	// });
};

const login = async (req, res) => {
	const body = req.body;

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
