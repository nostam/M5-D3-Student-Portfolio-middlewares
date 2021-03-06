const express = require("express");
const listEndPoints = require("express-list-endpoints");
const cors = require("cors");
const students = require("./services/students/");
const projects = require("./services/projects/");
const server = express();
const port = process.env.PORT || 3001;
const problems = require("./services/problems");
const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
} = require("./errorHandling");

const loggerMiddleware = (req, res, next) => {
  console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
  next();
};
server.use(cors());
server.use(express.json());
server.use(loggerMiddleware);
server.use("/students", students);
server.use("/projects", projects);
server.use("/problems", problems);
server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(catchAllHandler);

// console.log(listEndPoints(server));
server.listen(port, () => console.log("Server is running on port: ", port));
