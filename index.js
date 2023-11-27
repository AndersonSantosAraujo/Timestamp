import moment from "moment-timezone";
import express from "express";

const app = express();
const port = 3000;

app.get("/time.stamp", (req, res) => {
  const now = moment.tz("America/Sao_Paulo");
  const timestamp = now.valueOf();

  res.json({ timestamp });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
