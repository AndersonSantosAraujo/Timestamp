import moment from "moment-timezone";
import express from "express";
import rateLimit from "express-rate-limit";

const app = express();
const port = 3000;

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 3,
  handler: (req, res) => {
    return res
      .status(429)
      .send("Too many requests. Please try again in 10 minutes.");
  },
});

app.get("/time.stamp", loginLimiter, (req, res) => {
  const now = moment.tz("America/Sao_Paulo");
  const timestamp = now.valueOf();

  res.json({ timestamp });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
