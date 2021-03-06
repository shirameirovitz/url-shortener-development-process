const express = require("express");
const validUrl = require("valid-url");
const DataBase = require("../dataBase.js");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded());

router.post("/new", async (request, response) => {
  const url = request.body.url;

  if (!validUrl.isUri(url)) {
    response
      .status(400)
      .send("Invalid URL. Please enter a valid url for shortening.");
  } else {
    try {
      let shortUrl = await DataBase.addUrl(url);
      response.status(200).send(`Your new URL: localhost:3000/${shortUrl}`);
    } catch (e) {
      response.status(500).send("Internal Server Error!"`${e}`);
    }
  }
});

module.exports = { router };
