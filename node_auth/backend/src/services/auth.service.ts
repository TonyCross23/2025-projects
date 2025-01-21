import { JWT_SECRET } from "./../constants/env";
import { JWT_REFRESH_SECRET } from "../constants/env";
import VerificationCodeType from "../constants/verificationCode";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verification.model";
import { oneYearFromNow } from "../utils/data";
import jwt from "jsonwebtoken";
import appAssert from "../utils/appAssert";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";

type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  //validation existing user doesn't exist
  const existingUser = await UserModel.exists({ email: data.email });

  appAssert(!existingUser, CONFLICT, "Email already exists");

  //if (existingUser) {
  //  throw new Error("User already exists");
  //}

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
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginParams) => {
  //get user by email
  const user = await UserModel.findOne({ email });
  appAssert(user, UNAUTHORIZED, "Invalid email or password");

  //validate password from request
  const isValid = await user.comparePassword(password);
  appAssert(isValid, UNAUTHORIZED, "Invalid email or password");

  const userId = user._id;
  //create a session
  const session = await SessionModel.create({
    userId,
    userAgent,
  });

  const sessionInfo = {
    sessionId: session._id,
  };

  //sign access token & refresh token
  const refreshToken = jwt.sign({ sessionInfo }, JWT_REFRESH_SECRET, {
    audience: ["user"],
    expiresIn: "30d",
  });

  const accessToken = jwt.sign(
    {
      ...sessionInfo,
      userId: user._id,
    },
    JWT_SECRET,
    {
      audience: ["user"],
      expiresIn: "15m",
    }
  );

  //return user & token
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};
