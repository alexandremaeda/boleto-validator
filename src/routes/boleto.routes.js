const { Router } = require("express");

const CheckBoletoController = require("../useCases/checkBoleto/CheckBoletoController");

const boletoRouter = Router();

boletoRouter.get("/:linhaDigitavel", CheckBoletoController.handle);

module.exports = boletoRouter;
