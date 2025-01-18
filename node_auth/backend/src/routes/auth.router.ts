import { Router } from "express";
import { registerHandler } from "../controllers/auth.controller";

const authRouters = Router();

//prefix : /auth
authRouters.post("/register", registerHandler);

export default authRouters;
