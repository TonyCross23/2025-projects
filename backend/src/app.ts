import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db";
import router from "./routes/auth.router";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//router
app.use("/api", router);

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});

export default app;
