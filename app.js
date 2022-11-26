require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const session = require('express-session');
const passport = require('passport');

const router = require("./router/index");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// app.set("views", "views");
app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/views", express.static(path.join(__dirname, "views")));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));


app.use(passport.authenticate('session'));
// điều hướng router
app.use("/", router);

app.listen(process.env.PORT || "4000", () => {
  console.log("Server is running");
});
