//.envが読み込めるようにdotenvを入れる。
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//node-progress(pg)を入れる。
const { Client } = require("pg");
const app = express();

app.use(bodyParser.json());
app.use(cors());

//pgでclient instanceをつくる。これがdbの代わりをしてくれる。.envに入っているコネクションチェーンでdbにつながる。
  const client = new Client({
  connectionString: process.env.DATABASE_URL,
 
});

client.connect();


app.get("/info", async (req, res) => {
  let result = [];
  const data = await client.query("select*from current_subscriptions");
//テーブルの列が配列になって、それがたくさん入った配列が返ってくる。
  for(element of data.rows){
    result.push(element.service_name)
  }
    res.send(result);
  await client.end()
});

app.listen(3000);
