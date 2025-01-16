const express = require("express");
const postController = require("../controller/post.controller.js");
const protect = require("../middleware/auth.middleware.js");

const router = express.Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(protect, postController.createPost);

router
  .route("/:id")
  .get(protect, postController.getOnePost)
  .patch(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

module.exports = router;
