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
}

export default new postService();
