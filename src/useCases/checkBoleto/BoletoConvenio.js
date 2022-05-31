const { formatMoneyToReal } = require("../../utils");

module.exports = class BoletoTitulo {
  static montarLinhaDigitavel(linhaDigitavel) {
    // 82630000000 5 21600040403 0 00032250401 0 05202210003 7

    const digitoVerificador1 = linhaDigitavel.slice(11, 12);
    const digitoVerificador2 = linhaDigitavel.slice(23, 24);
    const digitoVerificador3 = linhaDigitavel.slice(35, 36);
    const digitoVerificador4 = linhaDigitavel.slice(47, linhaDigitavel.length);

    const posicao1 = linhaDigitavel.slice(0, 11);
    const posicao2 = linhaDigitavel.slice(12, 23);
    const posicao3 = linhaDigitavel.slice(24, 35);
    const posicao4 = linhaDigitavel.slice(36, 47);

    const identificacaoProduto = linhaDigitavel.slice(0, 1);
    const identificacaoSegmento = linhaDigitavel.slice(1, 2);
    const identificacaoValorRealOuReferencia = linhaDigitavel.slice(2, 3);
    const digitoVerificadorGeral = linhaDigitavel.slice(3, 4);
    const valor = linhaDigitavel.slice(4, 11) + linhaDigitavel.slice(12, 16);
    const identificacaoEmpresaOrgao = linhaDigitavel.slice(16, 20);
    const campoLivreEmpresaOrgao =
      linhaDigitavel.slice(20, 23) +
      linhaDigitavel.slice(24, 35) +
      linhaDigitavel.slice(36, 47);
    const dataVencimento =
      linhaDigitavel.slice(20, 23) + linhaDigitavel.slice(24, 29);

    return {
      digitoVerificador1,
      digitoVerificador2,
      digitoVerificador3,
      digitoVerificador4,
      posicao1,
      posicao2,
      posicao3,
      posicao4,
      identificacaoProduto,
      identificacaoSegmento,
      identificacaoValorRealOuReferencia,
      digitoVerificadorGeral,
      valor,
      identificacaoEmpresaOrgao,
      campoLivreEmpresaOrgao,
      dataVencimento,
    };
  }

  static validarDigitosVerificadores(linhaDigitavel) {
    const {
      digitoVerificador1,
      digitoVerificador2,
      digitoVerificador3,
      digitoVerificador4,
      posicao1,
      posicao2,
      posicao3,
      posicao4,
    } = this.montarLinhaDigitavel(linhaDigitavel);

    const digitosVerificadores = [
      parseInt(digitoVerificador1),
      parseInt(digitoVerificador2),
      parseInt(digitoVerificador3),
      parseInt(digitoVerificador4),
    ];

    const soma = (posicao) => {
      let primeiroMultiplicador = true;
      const somado = posicao.map((val) => {
        const multiplicador = primeiroMultiplicador ? 2 : 1;
        let resultado = val * multiplicador;
        if (resultado > 9) {
          resultado = resultado.toString();
          resultado = +resultado.substring(0, 1) + +resultado.substring(1);
        }
        primeiroMultiplicador = !primeiroMultiplicador;
        return resultado;
      });

      return somado;
    };

    const somador = (valorAnterior, valorAtual) => valorAnterior + valorAtual;

    const valorInicial = 0;

    const posicao1Somado = soma([...posicao1]).reduce(somador, valorInicial);
    const posicao2Somado = soma([...posicao2]).reduce(somador, valorInicial);
    const posicao3Somado = soma([...posicao3]).reduce(somador, valorInicial);
    const posicao4Somado = soma([...posicao4]).reduce(somador, valorInicial);

    const digitosVerificados = [
      posicao1Somado,
      posicao2Somado,
      posicao3Somado,
      posicao4Somado,
    ].map((val) => {
      const resto = val % 10;
      const digitoAutoConderencia = resto === 0 ? 0 : 10 - resto;

      return digitoAutoConderencia;
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
    const { posicao1, posicao2, posicao3, posicao4, valor } =
      this.montarLinhaDigitavel(linhaDigitavel);

    const barCode = `${posicao1}${posicao2}${posicao3}${posicao4}`;

    const reais = parseInt(valor.slice(0, valor.length - 2));
    const centavos = valor.slice(9, valor.length);
    const valorFormated = `${reais}.${centavos}`;
    var amount = formatMoneyToReal(valorFormated);

    return {
      barCode,
      amount,
    };
  }
};
