import asyncErrorWrapper from "express-async-handler";
import Application from "../../models/Application.js";
import CustomError from "../../utils/error/CustomError.js";

const checkApplicationExist = asyncErrorWrapper(async (req, res, next) => {
  const code = req.params.code;
  const application = await Application.findOne({ code });

  if (!application) {
    return next(new CustomError("Başvuru bulunamadı", 404));
  }
  req.data = application;
  next();
});

export { checkApplicationExist };
