const express = require("express");

// Controllers
const {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/posts.controller");

// Middlewares
const { postExists } = require("../middlewares/posts.middleware");
const { protectSession } = require("../middlewares/auth.middleware");

// Utils
const { upload } = require("../utils/upload.util");

const postsRouter = express.Router();

postsRouter.use(protectSession);

// single => 1 image
// array, n => n images
postsRouter
  .route("/")
  .get(getAllPosts)
  .post(upload.array("filename", 3), createPost);

postsRouter
  .use("/:id", postExists)
  .route("/:id")
  .get(getPostById)
  .patch(updatePost)
  .delete(deletePost);

module.exports = { postsRouter };
