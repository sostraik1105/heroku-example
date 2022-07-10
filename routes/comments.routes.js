const express = require("express");

// controller
const {
  getAllComments,
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
} = require("../controllers/comments.controller");

// middlewares
const { commentExists } = require("../middlewares/comments.middleware");
const { protectSession } = require("../middlewares/auth.middleware");

const commentsRouter = express.Router();

commentsRouter.use(protectSession);

commentsRouter.route("/").get(getAllComments).post(createComment);

commentsRouter
  .use(commentExists)
  .route("/:id")
  .get(getCommentById)
  .patch(updateComment)
  .delete(deleteComment);

module.exports = { commentsRouter };
