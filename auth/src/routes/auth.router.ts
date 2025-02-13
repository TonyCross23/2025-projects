import express, { Request, Response, Router } from "express";

const authRoute: Router = express.Router();

authRoute.get("/healthckeck", (req: Request, res: Response) => {
  res.send("Hello World!").status(200);
});

export default authRoute;
