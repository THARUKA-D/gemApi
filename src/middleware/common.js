const cors = require("cors");
const parser = require("body-parser");

const handleCors = (router) => {
  router.use(cors({ credentials: true, origin: true }));
};

const bodyParser = (router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

module.exports = {
  handleCors,
  bodyParser
};
