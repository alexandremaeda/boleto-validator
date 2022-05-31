const AppError = require("../erros/AppError.js");

module.exports = function (error, request, response, next) {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ status: "error", message: error.message });
  }

  console.error(error);

  return response
    .status(500)
    .json({ status: 500, message: `internal server error ${error.message}` });
};
