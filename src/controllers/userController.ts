import User from "../models/User";
import { IUser } from "../models/User";

export const createUser = async (user: Partial<IUser>) => {
  const { name, email, password } = user;
  if (!name || !email || !password) {
    return { error: "Please provide all the required fields" };
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { error: "User with that email already exists." };
  }

  const newUser = new User({ email, name, password });
  await newUser.save();
  const token = await newUser.generateAuthToken();
  return { user: newUser, token };
};
