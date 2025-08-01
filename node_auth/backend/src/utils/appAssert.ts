import { HttpStatusCode } from "./../constants/http";
import assert from "node:assert";
import AppError from "./AppError";
import AppErrorCode from "../constants/appErrorCode";

type AppAssert = (
  condition: any,
  HttpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition;

/**
 * Asserts a condition and throws an AppError if the condition is falsy.
 */
const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;
