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

const articleSchema = {
  title: String,
  content: String
}

const Article = mongoose.model("Article", articleSchema);

app.route("/articles").get(function (req, res) {
  Article.find({}).then(function (foundArticle) {
    res.send(foundArticle);
  }).catch(function (err) {
    console.log(err);
    res.send(err);
  });
}).post(function (req, res) {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save().then(function () {
    res.send("Article added " + req.body.title);
  }).catch(function (err) {
    console.log(err);
  });
}).delete(function (req, res) {
  Article.deleteMany({}).then(function () {
    res.send("All articles deleted");
  }).catch(function (err) {
    console.log(err);
  })
});

app.route("/articles/:articleTitle").get(function (req, res) {
  Article.findOne({ title: req.params.articleTitle }).then(function (foundArticle) {
    if(foundArticle){
      res.send(foundArticle);
    } else {
      res.send("Article not found");
    }
  }).catch(function (err) {
    console.log(err);
    res.send(err);
  });
}).put(function (req, res){
  Article.updateOne({ title: req.params.articleTitle }, {
    title: req.body.title,
    content: req.body.content
  },
  {overwite: true}
  ).then(function () {
    res.send("Article updated " + req.body.title);
  }).catch(function (err) {
    console.log(err);
  });
}).patch(function (req, res) {
  Article.updateOne({ title: req.params.articleTitle }, {
    $set: req.body
  }).then(function () {
    res.send("Article patched " + req.body.title);
  }).catch(function (err) {
    console.log(err);
  });
}).delete(function (req, res) {
  Article.deleteOne({ title: req.params.articleTitle }).then(function () {
    res.send("Article deleted " + req.params.articleTitle);
  }).catch(function (err) {
    console.log(err);
  })
});

app.get("/", function (req, res) {
  res.render("list");

});


app.post("/", function (req, res) {


});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
