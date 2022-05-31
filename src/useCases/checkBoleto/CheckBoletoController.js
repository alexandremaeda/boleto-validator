// A separação foi feita em cima de features.
// Então todos os recursos necessários estarão dentro da pasta useCase.
// Como existem dois tipos de boleto, achei melhor separar-los.
const CheckBoletoUseCase = require("./CheckBoletoUseCase.js");

module.exports = class CheckBoleto {
  // O método handler fica rensponsável por executar o useCase em questão.
  static handle(request, response) {
    const { linhaDigitavel } = request.params;

    const boletoInformacoes = CheckBoletoUseCase.execute(linhaDigitavel);

    return response.json(boletoInformacoes);
  }
};
