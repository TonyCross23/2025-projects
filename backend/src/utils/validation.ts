import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 3 characters long" })
    .max(255, { message: "Name must be 255 characters under" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be 100 characters long" }),
});

export const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(8).max(100),
});
