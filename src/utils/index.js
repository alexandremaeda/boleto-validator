module.exports = {
  addDaysToDate(date, days) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  },
  formatMoneyToReal(val) {
    var amount = val.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    return amount;
  },
};
