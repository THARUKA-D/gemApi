const { MongoClient } = require("mongodb");

const mongoConnection = async () => {
	const url =
		"mongodb+srv://shakirbari123:iitnewdbPw@cluster0.mzisrwh.mongodb.net/gemAPP?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
	const client = new MongoClient(url);

	let db;
	try {
		await client.connect();

		db = client.db("gemAPP");
		console.log("Database Connected");
	} catch (err) {
		console.log(err.stack);
	}

	return db;
};

module.exports = { mongoConnection };
