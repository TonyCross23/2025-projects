import { User } from "../models/user.model.js";

class userService {
  // Create a new user
  async createUser(data) {
    try {
      // Create and save the user in the database
      const newUser = await User.create(data);
      return newUser;
    } catch (error) {
      // If the error is related to duplicate username, handle it
      if (error.code === 11000) {
        // 11000 is the error code for duplicate key
        throw new Error("Username already exists");
      }
      // For other errors, throw a generic error
      throw new Error("Error creating user");
    }
  }
}

export default new userService();
