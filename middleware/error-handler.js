const { StatusCodes } = require("http-status-codes");
const errorMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, Please try again",
    stack: err.stack,
  };
  if (err.validatorKey === "isConfirmPasswordMatch") {
    (customError.msg = err.errors.map((item) => item.message).join(",")),
      (customError.statusCode = 400)
  }
  if (err.name == "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  
  return res.status(customError.statusCode).json({
    msg: customError.msg,
    stack: customError.stack,
  });
};

module.exports = errorMiddleware;
