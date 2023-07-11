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

const Product = mongoose.model("Product", productSchema);

// APIApp.get("/", (req, res) => {
//   res.send("Test Server");
// });

//create method
APIApp.post("/create", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = new Product({ name, price, description });
    const savedProduct = await product.save();
    if (savedProduct) {
      res.status(200).json(savedProduct);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//get method
APIApp.get("/", async (req, res) => {
  try {
    const allProduct = await Product.find();
    res.status(200).json(allProduct);
  } catch (error) {
    res.status(500).json({ error });
  }
});


//get method single product by id
APIApp.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

//delete a product
APIApp.delete("/delete/:id", async(req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(product){
            res.json(product);
        }
        else{
            res.status(404).json({error:"Product Not found"});
        }
    }catch(error){
        res.status(500).json(error);
    }
})

app.listen(port, () => {
  console.log("Server is running");
});
