import asyncErrorWrapper from "express-async-handler";
import Application from "../../models/Application.js";
import CustomError from "../../utils/error/CustomError.js";

const checkApplicationExist = asyncErrorWrapper(async (req, res, next) => {
  const application_id = req.params.id || req.params.application_id;

  console.log(application_id);

  // const application = await Application.findOne({
  //   $or: [{ _id: application_id }, { code: application_id }]
  // });

  const application = await Application.findById(application_id);

  if (!application) {
    return next(new CustomError("Başvuru bulunamadı", 404));
  }
  req.data = application;
  next();
});

const checkApplicationExistByCode = asyncErrorWrapper(async (req, res, next) => {
  const application_code = req.params.code

  const application = await Application.findOne({
    code: application_code
  });

  if (!application) {
    return next(new CustomError("Başvuru bulunamadı", 404));
  }
  req.data = application;
  next();
});


export { checkApplicationExist, checkApplicationExistByCode };
