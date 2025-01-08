import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./config/db.config.js";
import { router } from "./routes/user.router.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();
dotenv.config();
const upload = multer();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(upload.none());

const port = process.env.PORT || 9000;

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
