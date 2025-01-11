import mongoose from "mongoose";

if (!process.env.MONGODB_URL) {
  throw new Error("MONGO_URI must be defined");
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
