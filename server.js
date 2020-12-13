//importing dotenv to readd from .env
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//import node-progress(pg)
const { Client, Pool } = require("pg");
const app = express();

//making extended as true, you can get the response in a form of an array
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

//Use pg to make client, which is connected to the db using the info in the .env file.
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect();

//(5) api to update a service info
app.put("/info/update/:id", async(req,res)=>{
  
  let text= "update current_subscriptions set date=$1, service_name=$2, url=$3, price_per_year=$4, description=$5 where id = $6";
  const {id} = req.params;
   
  try{
    await client.query(text, [
      req.body.date,
      req.body.service_name,
      req.body.url,
      req.body.price,
      req.body.description,
      id
    ]);
    res.json("updated!")

}catch (err){
  console.error(err.message)

}})

//(4) api to delete a service
app.delete("/info/:id", async(req, res)=>{
  try{
    const {id} = req.params;
    await client.query("delete from current_subscriptions where id = $1", [id])
   res.json("Service was deleted.");
  } catch(err){
    console.error(err.message);
  }
}) 

//(3) api to get details of a service_name from the table
app.get("/info/:service", async (req, res) => {
  const {service} = req.params;
  let text = "select*from current_subscriptions where service_name = ($1)";
  let values = [service];

  const data = await client.query(text, values);

  let serviceInfo = data.rows[0];
  res.send(serviceInfo);

});

//(1) api to get all the service_names in the table
app.get("/info", async (req, res) => {
  let result = [];
  const data = await client.query(
    "select service_name from current_subscriptions"
  );
  //The response is an array of service_names.
  for (element of data.rows) {
    result.push(element.service_name);
  }
  res.send(result);
  //await client.end(); ←This stops server??
});

//(2) api to insert a new service info from a form
//    Use a prepared statement/parametarized query

app.post("/form", async (req, res) => {
  let text =
    "insert into current_subscriptions (date, service_name, url, price_per_year, description) values ($1, $2, $3, $4, $5)";
  try {
    const data = await client.query(text, [
      req.body.date,
      req.body.service_name,
      req.body.url,
      req.body.price,
      req.body.description,
    ]);
    } catch (err) {
    console.log(err.stack);
  }
});

app.listen(3000);
