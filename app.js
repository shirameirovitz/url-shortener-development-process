const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./api");

const path = require("path");
const pug = require("pug");

const DataBase = require("./dataBase");
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/api", api);

app.use("/public", express.static(`./public`));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  try {
    res.sendFile(__dirname + "/views/index.html");
  } catch {
    res.status(404).send("page not found");
  }
});

app.get("/:id", async (request, response) => {
  const { id } = request.params;
  let originalUrl = await DataBase.findOriginalUrl(id);
  if (!originalUrl) {
    response.status(400).send("short ID not exists");
    return;
  }
  response.status(302).redirect(`${originalUrl}`);
});

app.set("views", path.join(__dirname), "views");

app.set("view engine", "pug");
module.exports = app;
