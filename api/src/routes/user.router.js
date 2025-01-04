import express from "express";
import userController from "../controllers/user.controller.js";

export const router = express.Router();

router.post("/register", userController.addUser);
