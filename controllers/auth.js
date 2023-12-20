import CustomError from "../utils/error/CustomError.js";
import User from "../models/User.js";
import asyncErrorWrapper from "express-async-handler";
import { validateUserInput } from "../utils/input/inputFunctions.js";
import { sendJwtToClient } from "../utils/database/auth/tokenFunctions.js";

const register = asyncErrorWrapper(async (req, res, next) => {
    const userInformation = req.body;
  
    const user = await User.create({
      ...userInformation,
    });
    sendJwtToClient(user, res);
  });
  

const login = asyncErrorWrapper(async (req, res, next) => {
  const { userName, password } = req.body;

  if (!validateUserInput(userName, password)) {
    return next(new CustomError("Please Check your Inputs", 400));
  }

  const user = await User.findOne({ userName }).select("+password");

  if(!user) {
    return next(new CustomError("Invalid email address or password", 400));
  }

  if (!comparePassword(password, user.password)) {
    return next(new CustomError("Please Check your credentials", 400));
  }

  sendJwtToClient(user, res);
});

export { login, register };
