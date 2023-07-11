const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
const port = 5000;

const APIApp = express.Router();
app.use("/", APIApp);

mongoose
  .connect(
    `mongodb+srv://apiApp:PWrx4ddwp84ZalFi@cluster0.hlzaati.mongodb.net/APIApp?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });


const productSchema = new mongoose.Schema({
    name: String, 
    price: Number,
    description: String,
});

const Product = mongoose.model('Product', productSchema);

APIApp.get("/", (req, res) => {
  res.send("Test Server");
});

app.listen(port, () => {
  console.log("Server is running");
});
