const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://root:mypassword@mongo:27017/?authSource=admin")
  .then(() => console.log("Succefully connected db"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("<h2>Hello World , i am Tony, Hehe<h2>");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
