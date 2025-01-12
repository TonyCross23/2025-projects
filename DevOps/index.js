const express = require("express");
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP } = require("./configs/config.js");

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

app.get("/", (req, res) => {
  res.send("<h2>Hello World , i am Tony, Hehe<h2>");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
