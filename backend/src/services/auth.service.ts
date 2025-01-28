import User from "../models/user.model";
import { loginSchema, registerSchema } from "../utils/validation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (userData: any, userAgent: string) => {
  const { name, email, password } = registerSchema.parse(userData);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    userAgent,
  });

  return user;
};

export const loginUser = async (userData: any) => {
  const { email, password } = loginSchema.parse(userData);
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return token;
};
