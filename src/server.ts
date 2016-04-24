/// <reference path="../typings/tsd.d.ts" />

import * as express from 'express'

const app = express()


app.get("/test", (req, res) => {
  res.send("OK")
})

app.get("/throw", (req, res) => {
  throw new Error("!!")
})

app.listen(5000, () => {
  console.log("server started");

})
