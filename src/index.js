const express = require("express");
const { applyMiddleware, applyRoutes } = require("./utils");
const { routes, middleware } = require("./middleware");
const { mongoConnection } = require("./utils/mongo-connection");

const PORT = 3001;
const router = express();

applyMiddleware(middleware, router);
applyRoutes(routes, router);

mongoConnection();

router.listen(PORT, () => {
	console.log(`Server is running on Port:${PORT}`);
});
