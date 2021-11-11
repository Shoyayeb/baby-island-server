const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const email = require("mongodb").email;
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4f4qc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function run() {
    try {
        await client.connect();
        const database = client.db("products");
        const productsCollection = database.collection("products");

        app.post("/addnew", async (req, res) => {
            const plan = req.body;
            console.log(plan);
            const result = await plansCollection.insertOne(plan);
            console.log(result);
            res.json(result);
        });
    } finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Server running on", port);
});

app.listen(port, () => {
    console.log("Running server on", port);
});
