import { Router } from "express";
import { loginHandler, registerHandler } from "../controllers/auth.controller";

const authRouters = Router();

//prefix : /auth
authRouters.post("/register", registerHandler);
authRouters.post("/login", loginHandler);

export default authRouters;
