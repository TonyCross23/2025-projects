import { JWT_SECRET } from "./../constants/env";
import { JWT_REFRESH_SECRET } from "../constants/env";
import VerificationCodeType from "../constants/verificationCode";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verification.model";
import { oneYearFromNow } from "../utils/data";
import jwt from "jsonwebtoken";

type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  //validation existing user doesn't exist
  const existingUser = await UserModel.exists({ email: data.email });

  if (existingUser) {
    throw new Error("User already exists");
  }
  //create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  //create user verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.EmailVerification,
    expireAt: oneYearFromNow(),
  });

  //session create
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  //sign access token & refresh token
  const refreshToken = jwt.sign(
    { sessionId: session._id },
    JWT_REFRESH_SECRET,
    {
      audience: ["user"],
      expiresIn: "30d",
    }
  );

  const accessToken = jwt.sign(
    {
      userId: user._id,
      sessionId: session._id,
    },
    JWT_SECRET,
    {
      audience: ["user"],
      expiresIn: "15m",
    }
  );

  //return user & token
  return {
    user,
    accessToken,
    refreshToken,
  };
};
