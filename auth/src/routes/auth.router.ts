import express, { Request, Response, Router } from "express";
import { createUserHandler } from "../controllers/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserValidation } from "../validation/user.validation";

const authRoute: Router = express.Router();

authRoute.post(
  "/api/users",
  validateResource(createUserValidation),
  createUserHandler
);

export default authRoute;
