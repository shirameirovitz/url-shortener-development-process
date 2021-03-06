const express = require("express");
const DataBase = require("../dataBase.js");

const statistics = express.Router();
statistics.use(express.json());
statistics.use(express.urlencoded());

statistics.get("/", async (request, response) => {
  try {
    const url = await DataBase.readAllData();
    console.log(url);
    response.render("statistics", { urls: url });
  } catch (e) {
    response
      .status(500)
      .json({ message: "Internal Server Error!", error: `${e}` });
  }
});

module.exports = { statistics };
