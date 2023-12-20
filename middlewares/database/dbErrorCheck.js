import CustomError from "../../helpers/error/CustomError";
import asyncErrorWrapper from "express-async-handler";
import User from "../../models/User";
import Comment from "../../models/Comment";

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
  const id  = req.params.id || req.params.user_id;
  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError("There is no such user with that id", 400));
  }
  req.data = user;
  next();
});

const checkOwnerAndAnswerExist = asyncErrorWrapper(async (req, res, next) => {
  const user_id = req.params.user_id;
  const comment_id = req.params.comment_id;
  
  const comment = await Comment.findOne({
    _id: comment_id,
    owner : user_id
  })
  if(!comment) {
    return next(new Error('There is no comment with that id associated with that user id', 400));
  }
  next()
});

export { checkUserExist, checkOwnerAndAnswerExist };
