import { Post } from "../models/post.model.js";

class postService {
  async createPost(data) {
    try {
      const newPost = await Post.create(data);
      return newPost;
    } catch (error) {
      throw new Error("Error creating post");
    }
  }
  async getAllPosts() {
    try {
      const posts = await Post.find({})
        .populate("author", "username")
        .sort({ createdAt: -1 });

      return posts;
    } catch (error) {
      return res.json({ error: "Error fetching posts" });
    }
  }

  async getpostById(_id) {
    if (!_id) throw new Error("Post ID is required");

    const post = await Post.findById(_id).populate("author", "username");
    return post;
  }
}

export default new postService();
