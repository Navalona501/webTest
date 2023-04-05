//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", { useNewUrlParser: true }).then(() => {
  console.log("Connected to database");
}).catch((err) => {
  console.log(err);
});



app.get("/", function (req, res) {
  res.render("list");

});


app.post("/", function (req, res) {


});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
