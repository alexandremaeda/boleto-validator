const CheckBoletoUseCase = require("./CheckBoletoUseCase.js");

const AppError = require("../../erros/AppError");

describe("Check Boleto", () => {
  it("should be able to return boleto titulo informations", async () => {
    const linhaDigitavel = "21290001192110001210904475617405975870000002000";
    const boletoInformacoes = CheckBoletoUseCase.execute(linhaDigitavel);

    expect(boletoInformacoes).toHaveProperty("barCode");
  });

  it("should be able to return boleto convênio informations", async () => {
    const linhaDigitavel = "826300000005216000404030000322504010052022100037";
    const boletoInformacoes = CheckBoletoUseCase.execute(linhaDigitavel);

    expect(boletoInformacoes).toHaveProperty("barCode");
  });

  it("should not be able to return boleto informations", async () => {
    expect(async () => {
      const linhaDigitavel = null;
      CheckBoletoUseCase.execute(linhaDigitavel);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to return boleto informations: linhaDigitavel undefined", async () => {
    expect(() => {
      const linhaDigitavel = null;
      CheckBoletoUseCase.execute(linhaDigitavel);
    }).toThrow("Você deve informar a Linha de Digitável");
  });

  it("should not be able to return boleto informations: linhaDigitavel not a number", async () => {
    expect(() => {
      const linhaDigitavel = "2129000119211000121090447561740597587000000200x";
      CheckBoletoUseCase.execute(linhaDigitavel);
    }).toThrow("Você deve informar apenas os números da Linha Digitável");
  });

  it("should not be able to return boleto informations: linhaDigitavel invalid character length", async () => {
    expect(() => {
      const linhaDigitavel = "2129000119211000121090447561740597587";
      CheckBoletoUseCase.execute(linhaDigitavel);
    }).toThrow("Formato inválido");
  });

  it("should not be able to return boleto informations: linhaDigitavel invalid digíto verificador", async () => {
    expect(() => {
      const linhaDigitavel = "21290001182110001210904475617405975870000002000";
      CheckBoletoUseCase.execute(linhaDigitavel);
    }).toThrow("Digitos Verificadores inválidos");
  });
});
