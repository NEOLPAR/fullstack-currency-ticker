const { Router } = require("express");
const currencyRouter = require('./api/currency/router');

const apiRouter = new Router();

apiRouter.get("")

currencyRouter(apiRouter)

/* API routes should be specified here */
apiRouter.get("/healthz", (req, res) => {
  res.status(200).json("healthy");
});

module.exports = apiRouter;
