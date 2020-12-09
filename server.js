//importing dotenv to readd from .env
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//import node-progress(pg)
const { Client } = require("pg");
const app = express();

//making extended as true, you can get the response in a form of an array(?)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Use pg to make client, which is connected to the db using the info in the .env file.
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

app.get("/info", async (req, res) => {
  let result = [];
  const data = await client.query("select*from current_subscriptions");
  //The response is an array of many arrays, each representing a row in the table.
  for (element of data.rows) {
    result.push(element.service_name);
  }
  res.send(result);
  //await client.end(); ←This stops server??
});

//Defining the format of a prepared statement/parametarized query
let text =
  "insert into current_subscriptions (date, service_name, url, price_per_year, description) values ($1, $2, $3, $4, $5)";

app.post("/form", async (req, res) => {
  try {
    const data = await client.query(text, [
      req.body.date,
      req.body.service_name,
      req.body.url,
      req.body.price,
      req.body.description,
    ]);
    console.log(data);
  } catch (err) {
    console.log(err.stack);
  }
});

// app.get("/", (req, res) => {
//   res.sendFile("index.html");
// });

app.listen(3000);
