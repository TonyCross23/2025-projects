const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postRouter = require("./routes/post.router.js");
const userRouter = require("./routes/user.router.js");
const session = require("express-session");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./configs/config.js");

const app = express();
const port = process.env.PORT || 3000;

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

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

// Redis connection event listeners
redisClient.on("connect", () => {
  console.log("Connected to Redis successfully");
});

redisClient.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

app.enable("trust proxy");
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,

    cookie: {
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      secure: false,
      maxAge: 30000, // 30 minutes
    },
  })
);

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("<h1>Hello docker</h1>");
  console.log("Hello nginx");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("<h2>Hello World , I am Tony, Hehe<h2>");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
