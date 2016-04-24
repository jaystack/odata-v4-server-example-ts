/// <reference path="../typings/tsd.d.ts" />

import * as express from 'express'

const app = express()


app.get("/test", (req, res) => {
  res.json({ok:42})
})

app.listen(5000, () => {
  console.log("server started");

})
