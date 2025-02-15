import { Request, Response } from "express";
import logger from "../utils/logger";
import { CreateUserInput } from "../validation/user.validation";
import { createUserService } from "../services/user.service";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) => {
  try {
    const user = await createUserService(req.body);
    return res.send(user);
  } catch (error: any) {
    logger.error(error);
    return res.status(400).send(error.message);
  }
};
