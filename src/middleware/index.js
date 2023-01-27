const { bodyParser, handleCors } = require("./common");
const { routes } = require("./routes");

const middleware = [bodyParser, handleCors];

module.exports = {
  middleware,
  routes,
};
