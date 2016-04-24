/// <reference path="typings/tsd.d.ts" />

import * as express from 'express'
import { MongoClient, Db } from 'mongodb'
import { createFilter } from 'odata-v4-mongodb'

const app = express()

const mongocn = process.env.MONGO_URL || "mongodb://localhost:27017/zeddb"
MongoClient
  .connect(mongocn)
  .then(db => startDataService(db))
  .then(db => seedInitData(db))



function startDataService(db: Db) {

  app.get("/api/products", (req, res, next) => {
    let filter = createFilter(req.query.$filter || '')
    console.log("filtering products: " + JSON.stringify(filter))
    db.collection("products")
      .find(filter)
      .toArray()
      .then(products => res.json(products))
      .catch(next)
  })

  console.log("Data service started");
  return db;
}

function seedInitData(db:Db) {
  var products = db.collection("products")
  products.count({}).then( result => {
    if (!result) {
      console.log("seeding db")
      products.insertMany(require('./data/seed.json') )
    }
  })
}


app.get("/health", (req, res) => res.send("OK"))
app.use(<ErrorRequestHandler>(err, req, res, next) => {
  res.status(500).json(err)
})

app.listen(process.env.PORT || 5000, () =>  console.log("server started"))

