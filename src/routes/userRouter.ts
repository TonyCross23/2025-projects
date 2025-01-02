import { Request, Response, Router } from "express";
import { IUser } from "../models/User";
import { registerUser } from "../controllers/userController";

const router = Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const userData: Partial<IUser> = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const registeredUser = await registerUser(userData);
    if (registeredUser.error) {
      res.status(400).json({ error: registeredUser.error });
    }
    res.status(201).json(registeredUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
