import moment from "moment-timezone";
import express from "express";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from 'url';
import path from 'path';
import favicon from 'serve-favicon';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 3,
  handler: (req, res) => {
    res.render('index', { title: 'Too many requests · AnderZone', heading: '429', text: 'Too many requests. Please try again in 1 minute.' })
  }
})

app.get("/time.stamp", loginLimiter, (_, res) => {
  const now = moment.tz("America/Sao_Paulo");
  const timestamp = now.unix();

  res.json({ timestamp });
});

app.get("*", (_, res) => {
  res.render('index', { title: 'Page not found · AnderZone', heading: '404', text: 'This is not the web page you are looking for.' })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
