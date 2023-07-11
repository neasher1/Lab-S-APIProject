const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
const port = 5000;

const APIApp = express.Router();
app.use("/", APIApp);

APIApp.get("/", (req, res) => {
  res.send("Test Server");
});

app.listen(port, () => {
  console.log("Server is running");
});
