const ObjectID = require("mongodb").ObjectId;
const { mongoConnection } = require("../utils/mongo-connection");

const fetchAllBuyers = async (req, res) => {
	try {
		const mongo = await mongoConnection();
		const db = mongo.collection("gemInfo");

		const findResult = await db.find({}).toArray();

		res.status(200).send({
			success: true,
			data: { data: findResult },
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			data: [],
		});
	}
};

const fetchGemsByUserId = async (req, res) => {
	try {
		const mongo = await mongoConnection();
		const db = mongo.collection("gemInfo");

		const findResult = await db.find({ userId: req.body.userId }).toArray();
		res.status(200).send({
			success: true,
			data: { data: findResult },
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			data: { data: [] },
		});
	}
};

const getAppoinmentsByBuyerId = async (req, res) => {
	try {
		const mongo = await mongoConnection();
		const db = mongo.collection("appointments");

		const findResult = await db.find({ buyerId: req.body.userId }).toArray();
		res.status(200).send({
			success: true,
			data: { data: findResult },
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			data: { data: [] },
		});
	}
};

const getAppoinmentsBySellerId = async (req, res) => {
	try {
		const mongo = await mongoConnection();
		const db = mongo.collection("appointments");

		const findResult = await db.find({ sellerId: req.body.userId }).toArray();
		res.status(200).send({
			success: true,
			data: { data: findResult },
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			data: { data: [] },
		});
	}
};

const sheduleAppointment = async (req, res) => {
	const appointment = req.body;

	const gemId = appointment.gemId;
	const sellerId = appointment.sellerId;

	try {
		const mongo = await mongoConnection();
		const db = mongo.collection("appointments");

		const gemdb = mongo.collection("gemInfo");
		const gemInfo = await gemdb.findOne({ _id: new ObjectID(gemId) });

		const sellerInfoDb = mongo.collection("users");
		const sellerInfo = await sellerInfoDb.findOne({
			_id: new ObjectID(sellerId),
		});

		const sheduleAppoinmemt = {
			gemId: gemId,
			sellerId: sellerId,
			buyerId: gemInfo.userId,
			sellerName: sellerInfo.name,
			sheduleDate: appointment.sheduleDate,
			sheduleTime: appointment.sheduleTime,
			gemName: gemInfo.gemName,
		};

		await db.insertOne(sheduleAppoinmemt);
		res.status(200).send({
			success: true,
			data: [],
		});
	} catch (error) {
		console.log(error.stack);
		res.status(500).send({
			success: false,
			data: [],
		});
	}
};

const addNewGemInfo = async (req, res) => {
	const gemInfo = req.body;

	const mongo = await mongoConnection();

	try {
		const db = mongo.collection("gemInfo");

		await db.insertOne(gemInfo);
		res.status(200).send({
			success: true,
			data: [],
		});
	} catch (error) {
		console.log(error.stack);
		res.status(500).send({
			success: false,
			data: [],
		});
	}
};

const userLogIn = async (req, res) => {
	const body = req.body;

	const mongo = await mongoConnection();
	try {
		const db = mongo.collection("users");

		const myDoc = await db.findOne({ name: body.userName });
		if (body.password === myDoc.password) {
			res.status(200).send({
				success: true,
				data: {
					id: myDoc._id,
					name: myDoc.name,
					email: myDoc.email,
					mobile: myDoc.mobile,
				},
			});
		} else {
			res.status(403).send({
				success: false,
				data: [],
			});
		}
	} catch (error) {
		console.log(error.stack);
		res.status(500).send({
			success: false,
			data: [],
		});
	}
};

const userSignUp = async (req, res) => {
	const newUserInfo = req.body;

	const user = {
		name: newUserInfo.name,
		password: newUserInfo.password,
		mobile: newUserInfo.mobile,
		email: newUserInfo.email,
		type: newUserInfo.type,
	};

	const mongo = await mongoConnection();
	try {
		const db = mongo.collection("users");
		const data = await db.insertOne(user);
		const myDoc = await db.findOne({ _id: data.insertedId });

		res.status(200).send({
			success: true,
			data: {
				id: myDoc._id,
				name: myDoc.name,
				email: myDoc.email,
				mobile: myDoc.mobile,
			},
		});
	} catch (error) {
		console.log(error.stack);
		res.status(500).send({
			success: false,
			data: [],
		});
	}
};

module.exports = {
	fetchAllBuyers,
	addNewGemInfo,
	userLogIn,
	userSignUp,
	fetchGemsByUserId,
	sheduleAppointment,
	getAppoinmentsBySellerId,
	getAppoinmentsByBuyerId,
};
