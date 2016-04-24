/// <reference path="../typings/tsd.d.ts" />

import * as express from 'express'
import {MongoClient, Db} from 'mongodb'

const app = express()
let db:Db = null;

MongoClient.connect(process.env.MONGO_URL, (err, _db) => {
  console.log("mongodb connected");
  db = _db;
})


app.get('/insert', (req, res) => {
  db.collection("users").insertOne({name:'zp'})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      res.status(500).json(e)
    })
})

app.get("/test", (req, res) => {
  res.send("OK")
})

app.get("/throw", (req, res) => {
  throw new Error("!!")
})


app.listen(5000, () => {
  console.log("server started");
})
