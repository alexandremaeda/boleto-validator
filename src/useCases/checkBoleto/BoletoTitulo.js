const { addDaysToDate, formatMoneyToReal } = require("../../utils");

module.exports = class BoletoTitulo {
  static #dataBase = new Date("1997/10/07");

  static montarLinhaDigitavel(linhaDigitavel) {
    // 21290.00119 21100.012109 04475.617405 9 75870000002000

    const identificacaoBanco = linhaDigitavel.slice(0, 3);
    const codigoMoeda = linhaDigitavel.slice(3, 4);
    const posicao1 = linhaDigitavel.slice(4, 9);
    const digitoVerificador1 = linhaDigitavel.slice(9, 10);
    const posicao2 = linhaDigitavel.slice(10, 20);
    const digitoVerificador2 = linhaDigitavel.slice(20, 21);
    const posicao3 = linhaDigitavel.slice(21, 31);
    const digitoVerificador3 = linhaDigitavel.slice(31, 32);
    const digitoVerificadorGeral = linhaDigitavel.slice(32, 33);
    const fatorVencimento = linhaDigitavel.slice(33, 37);
    const valor = linhaDigitavel.slice(37, 48);

    return {
      identificacaoBanco,
      codigoMoeda,
      posicao1,
      digitoVerificador1,
      posicao2,
      digitoVerificador2,
      posicao3,
      digitoVerificador3,
      digitoVerificadorGeral,
      fatorVencimento,
      valor,
    };
  }

  static validarDigitosVerificadores(linhaDigitavel) {
    const {
      identificacaoBanco,
      codigoMoeda,
      posicao1,
      digitoVerificador1,
      posicao2,
      digitoVerificador2,
      posicao3,
      digitoVerificador3,
    } = this.montarLinhaDigitavel(linhaDigitavel);

    const digitosVerificadores = [
      parseInt(digitoVerificador1),
      parseInt(digitoVerificador2),
      parseInt(digitoVerificador3),
    ];
    const posicao1Formatada = `${identificacaoBanco}${codigoMoeda}${posicao1}`;
    const posicoes = [...posicao1Formatada, ...posicao2, ...posicao3];

    let primeiroMultiplicador = true;

    const posicoesSomadas = posicoes.map((val) => {
      const multiplicador = primeiroMultiplicador ? 2 : 1;
      let resultado = val * multiplicador;
      if (resultado > 9) {
        resultado = resultado.toString();
        resultado = +resultado.substring(0, 1) + +resultado.substring(1);
      }
      primeiroMultiplicador = !primeiroMultiplicador;
      return resultado;
    });

    const somador = (valorAnterior, valorAtual) => valorAnterior + valorAtual;

    const valorInicial = 0;

    const posicao1Somado = posicoesSomadas
      .slice(0, 9)
      .reduce(somador, valorInicial);
    const posicao2Somado = posicoesSomadas
      .slice(9, 19)
      .reduce(somador, valorInicial);
    const posicao3Somado = posicoesSomadas
      .slice(19, posicoesSomadas.length)
      .reduce(somador, valorInicial);

    const digitosVerificados = [
      posicao1Somado,
      posicao2Somado,
      posicao3Somado,
    ].map((val) => {
      const resto = val % 10;
      const digitoVerificador = resto === 0 ? 0 : 10 - resto;

      return digitoVerificador;
    });

    if (
      JSON.stringify(digitosVerificadores) !==
      JSON.stringify(digitosVerificados)
    ) {
      return false;
    }

    return true;
  }

  static extrairInformacoes(linhaDigitavel) {
    const {
      identificacaoBanco,
      codigoMoeda,
      posicao1,
      posicao2,
      posicao3,
      digitoVerificadorGeral,
      fatorVencimento,
      valor,
    } = this.montarLinhaDigitavel(linhaDigitavel);

    const barCode = `${identificacaoBanco}${codigoMoeda}${digitoVerificadorGeral}${fatorVencimento}${valor}${posicao1}${posicao2}${posicao3}`;
    const dataVencimento = addDaysToDate(
      this.#dataBase,
      parseInt(fatorVencimento)
    );

    const reais = parseInt(valor.slice(0, valor.length - 2));
    const centavos = valor.slice(8, valor.length);
    const valorFormated = `${reais}.${centavos}`;
    var amount = formatMoneyToReal(valorFormated);

    return {
      barCode,
      dataVencimento: dataVencimento.toISOString().slice(0, 10),
      amount,
    };
  }
};
