// Models
const { Comment } = require("../models/comment.model");

// utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const commentExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findOne({ where: { id } });

  if (!comment) {
    return next(new AppError("comment not found", 404));
  }

  req.comment = comment;

  next();
});

module.exports = { commentExists };
