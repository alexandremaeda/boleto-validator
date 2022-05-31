const { Router } = require("express");
const boletoRouter = require("./boleto.routes.js");

const routes = Router();

routes.use("/boleto", boletoRouter);

module.exports = routes;
