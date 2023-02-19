const mongoController = require("../controllers/mongo-controller");

const routes = [
	{
		path: "/fetchAllBuyers",
		handler: mongoController.fetchAllBuyers,
		method: "post",
	},
	{
		path: "/addNewGemInfo",
		handler: mongoController.addNewGemInfo,
		method: "post",
	},
	{
		path: "/userSignUp",
		handler: mongoController.userSignUp,
		method: "post",
	},
	{
		path: "/userLogIn",
		handler: mongoController.userLogIn,
		method: "post",
	},
];

module.exports = {
	routes,
};
