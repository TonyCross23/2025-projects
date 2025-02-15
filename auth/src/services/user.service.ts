import User, { UserInput } from "../models/user.model";

export const createUserService = async (input: UserInput) => {
  try {
    const user = await User.create(input);
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};
