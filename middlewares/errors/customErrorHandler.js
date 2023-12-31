import CustomError from "../../utils/error/CustomError.js";

const customErrorHandler = (err, req, res, next) => {
  let customError = err;

  if (err.name === "SyntexError") {
    customError = new CustomError("Unexpected syntax", 400);
  }
  if (err.name === "ValidationError") {
    customError = new CustomError(err.message, 404);
  }
  if (err.name === "CastError") {
    customError = new CustomError("Please provide a valid id", 400);
  }
  if (err.code === 11000) {
    customError = new CustomError(
      "Duplicate Key Found : Check Your Input",
      400
    );
  }

  console.log(customError.name, customError.message, customError.status);

  res.status(customError.status || 500).json({
    success: false,
    message: customError.message,
  });
};

export {customErrorHandler};
