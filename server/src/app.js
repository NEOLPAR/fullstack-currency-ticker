const express = require("express");
const cors = require("cors");

const api = require("./api");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use("/api", api);


// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({error: err.message})
})

app.set("port", process.env.PORT || 3001);
module.exports = app;
