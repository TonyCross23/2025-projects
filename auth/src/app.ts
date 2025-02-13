import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";

const port = config.get("port") as number;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  logger.info(`Server running at http://localhost:${port}`);
  await connect();
});
