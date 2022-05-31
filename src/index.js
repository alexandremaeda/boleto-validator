const express = require("express");
// routes isoladas em outro arquivo
const routes = require("./routes/index.js");
// middleware para tratar os erros da API
const globallyErrors = require("./middlewares/globallyErrors.js");

// mantive essa porta por conta das intruções
const PORT = 8080;

const app = express();

app.use(routes);
app.use(globallyErrors);

app.listen(PORT, () => {
  console.log(`boleto-validator listening on port ${PORT}`);
});
