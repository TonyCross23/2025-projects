import express from "express";
import userController from "../controllers/user.controller.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import postController from "../controllers/post.controller.js";

export const router = express.Router();

router.post("/register", userController.addUser);

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
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
  } catch (error) {
    console.log(error);
  }
});

//get uer data
router.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, useInfo) => {
    if (err) throw err;
    res.json(useInfo);
  });
});

//logout
router.post("/logout", async (req, res) => {
  res.clearCookie("token", "").json({ message: "Logged out" });
});

//post router
router.post("/post/create", postController.addPost);
