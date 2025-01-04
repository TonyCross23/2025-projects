import express from "express";
import userController from "../controllers/user.controller.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const router = express.Router();

router.post("/register", userController.addUser);
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const success = bcrypt.compareSync(password, userDoc.password);

  if (success) {
    jwt.sign(
      { username, user_id: userDoc._id },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          username,
          user_id: userDoc._id,
        });
      }
    );
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});
