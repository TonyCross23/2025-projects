import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from "../controllers/auth.controller";

const authRouters = Router();

//prefix : /auth
authRouters.post("/register", registerHandler);
authRouters.post("/login", loginHandler);
authRouters.get("/logout", logoutHandler);

export default authRouters;
