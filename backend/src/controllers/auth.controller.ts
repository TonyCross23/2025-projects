import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import { ZodError } from "zod";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body, req.headers["user-agent"] || "");
    res.status(201).json({
      message: "User created succefull",
      user,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      // Handle validation errors
      const errors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      res.status(400).json({ errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({
      message: "Login succefull",
      user: {
        token,
      },
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      // Handle validation errors
      const errors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      res.status(400).json({ errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};
