import { CREATED, OK } from "../constants/http";
import { createAccount, loginUser } from "../services/auth.service";
import catchError from "../utils/catchErrors";
import { setAuthCookies } from "../utils/cookies";
import { loginSchema, registerSchema } from "./auth.schema";

export const registerHandler = catchError(async (req, res) => {
  //validation request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  //call server
  const { user, accessToken, refreshToken } = await createAccount(request);
  //return response
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

//login
export const loginHandler = catchError(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { accessToken, refreshToken } = await loginUser(request);

  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
    message: "Loign Succefull",
  });
});
