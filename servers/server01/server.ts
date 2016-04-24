/// <reference path="../../typings/tsd.d.ts" />

import * as express from 'express'
import { MongoClient, Db } from 'mongodb'

const app = express()
app.get("/health", (req, res) => res.send("OK"))


function  startDataService(db: Db) {
  console.log("Starting data service");


}



app.listen(process.env.PORT || 5000, () => {
  var mongocn = process.env.MONGO_URL || "mongodb://localhost:27017/zeddb"

  MongoClient
    .connect(mongocn)
    .then(startDataService)
    .catch(err => console.log("Error " + err))

  console.log("server started");
})
