const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ryx6w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("bikeShop");
        const productCollection = database.collection("products");
        const orderCollection=database.collection("orders");


        //Get API
    app.get('/products', async (req, res) => {
        const cursor = productCollection.find({});
        const products = await cursor.toArray();
        res.send(products)
      })
      

        //Post API
    app.post("/products", async (req, res) => {
        const product = req.body;
        console.log('hitting post api', product );
         const result = await productCollection.insertOne(product);
         console.log(result);
         res.json(result)
      });
    }
    finally{

    }

}  
run().catch(console.dir);
app.get("/", (req, res) => {
    res.send("Bike Shop running");
  });
  app.listen(port, () => {
    console.log("Bike Shop running on port", port);
  });