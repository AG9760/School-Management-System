const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userroutes = require("./routes/user");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.use(bodyParser.json());
app.use(userroutes);

mongoose
  .connect("mongodb://localhost:27017/Login")
  .then((result) => {
    app.listen(8080);
    console.log("Server started");
  })
  .catch((err) => {
    console.log("Some error ocurred");
    console.log(err);
  });
