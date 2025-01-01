import express from "express";
import "./db/db";

const port = process.env.PORT || 6000;

const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
