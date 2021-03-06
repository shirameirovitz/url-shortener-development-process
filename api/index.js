const { Router } = require("express");
const { router } = require("./shorturl");
const { statistics } = require("./statistics");
//const statistic = require("./statistics");

const api = Router();

api.use("/shorturl", router);
api.use("/statistics", statistics);
api.use("*", (request, response) => {
  response.status(404) / send({ message: "Page Not Found" });
});

module.exports = api;
