import { PostSchemaValidation } from "../models/post.model.js";
import postService from "../services/post.service.js";
import jwt from "jsonwebtoken";

class postController {
  addPost = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        const { title, content, imageUrl } = req.body;
        const data = {
          title,
          content,
          imageUrl,
          author: info.user_id,
        };

        const { error } = PostSchemaValidation.validate(data);

        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        } else {
          const post = await postService.createPost(data);
          res
            .status(200)
            .json({ message: "Post created successfully", data: post });
        }
      });
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  };

  getPosts = async (req, res) => {
    const posts = await postService.getAllPosts();
    res.json(posts).status(200);
  };

  getPost = async (req, res) => {
    const { id } = req.params;
    const post = await postService.getpostById(id);
    res.json(post).status(200);
  };

  getOldPost = async (req, res) => {
    const { id } = req.params;
    const post = await postService.updatePostById(id);
    res.json(post).status(200);
  };

  updatePost = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        const { title, content, imageUrl, post__id } = req.body;
        const data = {
          title,
          content,
          imageUrl,
          author: info.user_id,
        };

        const { error } = PostSchemaValidation.validate(data);

        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        } else {
          const post = await postService.updatePostById(post__id, data);
          res
            .status(200)
            .json({ message: "Post created successfully", data: post });
        }
      });
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  };

  deletePostById = async (req, res) => {
    const { id } = req.params;
    await postService.deletePostById(id);
    res.json({ message: "post deleted succefully" }).status(200);
  };
}

export default new postController();
