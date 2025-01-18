import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import path from "path";

const handleZodErrors = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  return res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(`PATH: ${req.path}`, error);

  if (error instanceof z.ZodError) {
    handleZodErrors(res, error);
  }

  res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};

export default errorHandler;
