const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./configs/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch(error => {
    logger.error("error connecting to MongoDB", error);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger); // must be declared after express.json()
app.use(middleware.tokenExtractor); // use token extractor

// set the base route paths
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

// error handler
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;