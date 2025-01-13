const express = require("express");
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP } = require("./configs/config.js");
const postRouter = require("./routes/post.router.js");
const userRouter = require("./routes/user.router.js");

const app = express();
const port = process.env.PORT || 3000;

const connectWithRetry = () => {
  mongoose
    .connect(
      `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:27017/?authSource=admin`
    )
    .then(() => console.log("Successfully connected to the database"))
    .catch((e) => {
      console.error("Database connection error:", e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(express.json());
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("<h2>Hello World , i am Tony, Hehe<h2>");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
