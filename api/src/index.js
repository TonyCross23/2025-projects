import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./config/db.config.js";
import { router } from "./routes/user.router.js";

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

const port = process.env.PORT || 9000;

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
