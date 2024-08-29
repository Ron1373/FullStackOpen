const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogsRouter");
const usersRouter = require("./controllers/usersRouter");
const middleware = require("./utils/middleware");

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to database");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
