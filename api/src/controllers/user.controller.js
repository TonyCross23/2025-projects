import bcrypt from "bcrypt";
import { UserSchemaValidation } from "../models/user.model.js";
import userService from "../services/user.service.js";

class UserController {
  // Add user
  addUser = async (req, res) => {
    const { username, password } = req.body;

    // Hash password before saving
    const salt = bcrypt.genSaltSync(10);
    const data = {
      username,
      password: bcrypt.hashSync(password, salt),
    };

    // Joi validation
    const { error } = UserSchemaValidation.validate(data);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      // Call the service to create the user
      const user = await userService.createUser(data);
      return res
        .status(200)
        .json({ message: "User created successfully", data: user });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Failed to create user", details: err.message });
    }
  };
}

export default new UserController();
