const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
let logger = require("morgan");
const config = require("./config");
const path = require("path");

//all routes
const routes = require("../routers/index");
/**
 * Express instance
 * @public
 */
const app = express();
const server = require("http").createServer(app);

// morgan logging
app.use(
  morgan("combined", { stream: { write: (message) => console.log(message) } })
);

app.disable("etag");

// enable cors
app.use(cors());
app.options("*", cors());

// debug
app.use(logger("dev"));

//template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
// app.use("/public", express.static(path.join(__dirname, "..", "public")));
app.use("/public", express.static(path.join(__dirname, "public")));
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// home service
app.get("/", (req, res) => {
  return res.status(200).render("index");
});

app.get("/policy", (req, res) => {
  return res.status(200).render("policy");
});

app.get("/email", (req, res) => {
  return res.status(200).render("email/demo_school");
});

// v1 api routes
app.use("/v1", routes);

// handle router not found
app.get("*", function (req, res) {
  return res.status(404).json({ code: 404, message: "upss url not found !" });
});

//socket

// exports
module.exports = app;
