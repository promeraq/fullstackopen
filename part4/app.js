const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const loginRouter = require("./controllers/login");
require("express-async-errors");

logger.info("connecting to MongoDB");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.info("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
// json-parser
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);
app.use(middleware.tokenExtractor);
app.use("/api/users", middleware.userExtractor, usersRouter);
app.use("/api/login", loginRouter);

// added only if we're in test mode
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
