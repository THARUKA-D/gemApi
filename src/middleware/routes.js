const sqlController = require("../controllers/sql-controller");

// Defines routes and their handlers for incoming requests

const routes = [
	{
		path: "/",
		handler: sqlController.healthCheck,
		method: "get",
	},
	{
		path: "/newUser",
		handler: sqlController.addNewUser,
		method: "post",
	},
	{
		path: "/addHobbies",
		handler: sqlController.addHobbies,
		method: "post",
	},
  {
		path: "/fetchAllUsers",
		handler: sqlController.fetchAllUsers,
		method: "get",
	},
  {
		path: "/login",
		handler: sqlController.login,
		method: "post",
	},
];

module.exports = {
	routes,
};
