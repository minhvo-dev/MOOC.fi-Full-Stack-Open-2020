const app = require("./app");
const http = require("http");
const logger = require("./utils/logger");
const config = require("./configs/config");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
});