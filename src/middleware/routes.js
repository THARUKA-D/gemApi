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
	{
		path: "/fetchGemsByUserId",
		handler: mongoController.fetchGemsByUserId,
		method: "post",
	},
	{
		path: "/sheduleAppointment",
		handler: mongoController.sheduleAppointment,
		method: "post",
	},
	{
		path: "/getAppoinmentsBySellerId",
		handler: mongoController.getAppoinmentsBySellerId,
		method: "post",
	},
	{
		path: "/getAppoinmentsByBuyerId",
		handler: mongoController.getAppoinmentsByBuyerId,
		method: "post",
	},
];

module.exports = {
	routes,
};
