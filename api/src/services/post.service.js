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

  async getOldData(_id) {
    if (!_id) throw new Error("Post ID is required");

    const post = await Post.findById(_id);
    return post;
  }

  async updatePostById(_id, data) {
    try {
      const postDOc = await Post.findByIdAndUpdate(_id, data, {
        new: true,
      });
      if (!postDOc) {
        return res.json("post not found!");
      }
      return postDOc;
    } catch (error) {
      console.log(error);
    }
  }

  async deletePostById(_id) {
    try {
      const post = await Post.findByIdAndDelete(_id);
      if (!post) {
        throw new Error("post not found");
      }
      return post;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new postService();
