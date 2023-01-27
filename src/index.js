const express = require("express");
const { applyMiddleware, applyRoutes } = require("./utils");
const { routes, middleware } = require("./middleware");
const {connectMySQL } = require("./utils/connect-sql");
const PORT = 3001;

const router = express();

applyMiddleware(middleware, router);
applyRoutes(routes, router);

connectMySQL()

router.listen(PORT, () => {
	console.log(`Server is running on Port:${PORT}`);
});
