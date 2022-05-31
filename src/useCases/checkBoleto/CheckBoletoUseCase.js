const AppError = require("../../erros/AppError");
const BoletoTitulo = require("./BoletoTitulo.js");
const BoletoConvenio = require("./BoletoConvenio.js");

const tipoBoleto = {
  // 47 posições
  TITULO: "titulo",
  // 48 posições
  CONVENIO: "convenio",
};

module.exports = class CheckBoleto {
  static #tipoBoleto = {
    // 47 posições
    TITULO: "titulo",
    // 48 posições
    CONVENIO: "convenio",
  };

  // Define o tipo do boleto a ser utilizado, baseado na quantidade de caractéres.
  static #getBoletoTipo(linhaDigitavelLength) {
    const tipo =
      linhaDigitavelLength <= 47
        ? this.#tipoBoleto.TITULO
        : this.#tipoBoleto.CONVENIO;

    return tipo;
  }

  // Valida os digitos verificadores de cada tipo.
  static #validarDigitosVerificadores(linhaDigitavel) {
    const tipo = this.#getBoletoTipo(linhaDigitavel.length);
    let valido = false;

    switch (tipo) {
      case tipoBoleto.CONVENIO:
        valido = BoletoConvenio.validarDigitosVerificadores(linhaDigitavel);
        break;
      case tipoBoleto.TITULO:
        valido = BoletoTitulo.validarDigitosVerificadores(linhaDigitavel);
        break;
      default:
        throw new AppError("Linha digitável inválida");
    }

    return valido;
  }

  // Extrai as informações de cada tipo.
  static #extrairBoletoInformacoes(linhaDigitavel) {
    const tipo = this.#getBoletoTipo(linhaDigitavel.length);
    let informacoes;

    switch (tipo) {
      case tipoBoleto.CONVENIO:
        informacoes = BoletoConvenio.extrairInformacoes(linhaDigitavel);
        break;
      case tipoBoleto.TITULO:
        informacoes = BoletoTitulo.extrairInformacoes(linhaDigitavel);
        break;
      default:
        throw new AppError("Linha digitável inválida");
    }

    return informacoes;
  }

  // O método execute fica responsável por validar as regras em questões.
  // Criei alguns métodos estáticos e privados para uso exclusivo nesse useCase.
  static execute(linhaDigitavel) {
    if (!linhaDigitavel) {
      throw new AppError("Você deve informar a Linha de Digitável");
    }

    if (isNaN(linhaDigitavel)) {
      throw new AppError(
        "Você deve informar apenas os números da Linha Digitável"
      );
    }

    const linhaDigitavelLength = linhaDigitavel.length;

    if (linhaDigitavelLength < 47 || linhaDigitavelLength > 48) {
      throw new AppError("Formato inválido");
    }

    const digitosValidos = this.#validarDigitosVerificadores(linhaDigitavel);

    if (!digitosValidos) {
      throw new AppError("Digitos Verificadores inválidos");
    }

    const boletoInformacoes = this.#extrairBoletoInformacoes(linhaDigitavel);

    return boletoInformacoes;
  }
};
