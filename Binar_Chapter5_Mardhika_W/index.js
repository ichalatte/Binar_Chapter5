const express = require('express');
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mainRouter = require("./routers/main");
const gamesRouter = require("./routers/games");
const loginRouter = require("./routers/login");
const apiRouter = require("./routers/api");

const app = express();

const port = 5000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", mainRouter);
app.use("/games", gamesRouter);
app.use("/login", loginRouter);
app.use("/api", apiRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log('Server running on http://localhost:5000');
});

module.exports = app;