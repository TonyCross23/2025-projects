import User from "../models/user.model";
import { registerSchema } from "../utils/validation";
import bcrypt from "bcryptjs";

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
