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
        const userCollection=database.collection("users");


        //Get API(home)
    app.get('/products', async (req, res) => {
        const cursor = productCollection.find({}).limit(6);
        const products = await cursor.toArray();
        res.send(products)
      })
        //Get API
    app.get('/allProducts', async (req, res) => {
        const cursor = productCollection.find({});
        const allProducts = await cursor.toArray();
        res.send(allProducts)
      })
      //Get Unique API
      app.get('/products/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const product = await productCollection.findOne(query);
        res.json(product);
      })
  
      //Get order API
      app.get('/orders', async (req, res) => {
        const cursor = orderCollection.find({});
        const order = await cursor.toArray();
        console.log(order);
        res.send(order)
      })

        //Product Post API
    app.post("/products", async (req, res) => {
        const product = req.body;
        console.log('hitting post api', product );
         const result = await productCollection.insertOne(product);
         console.log(result);
         res.json(result)
      });
        //Order Post API
    app.post("/orders", async (req, res) => {
        const order = req.body;
         const result = await orderCollection.insertOne(order);
         res.json(result)
      });
        //User Post API
    app.post("/users", async (req, res) => {
        const user = req.body;
         const result = await userCollection.insertOne(user);
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