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
		path: "/scheduleAppointment",
		handler: mongoController.scheduleAppointment,
		method: "post",
	},
	{
		path: "/getAppointmentsBySellerId",
		handler: mongoController.getAppointmentsBySellerId,
		method: "post",
	},
	{
		path: "/getAppointmentsByBuyerId",
		handler: mongoController.getAppointmentsByBuyerId,
		method: "post",
	},
	{
		path: "/deleteGemInfo",
		handler: mongoController.deleteGemInfo,
		method: "post",
	},
	{
		path: "/updateGemInfo",
		handler: mongoController.updateGemInfo,
		method: "post",
	},
	{
		path: "/updateAppointment",
		handler: mongoController.updateAppointment,
		method: "post",
	},
	{
		path: "/deleteAppointment",
		handler: mongoController.deleteAppointment,
		method: "post",
	},
];

module.exports = {
	routes,
};
