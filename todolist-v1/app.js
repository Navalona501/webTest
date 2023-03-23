const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

const myDay = "ultimate";
let items = ['Buy Food', 'Cook Food', 'Eat Food'];
let workItems = [];
app.get("/", function (req, res){

    let today = new Date();

    const options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };

    let day = today.toLocaleDateString("en-US", options);
    
    res.render("list", {listTitle: day, newListItem: items});

});

app.post("/", function(req, res){
    let item = req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
    
});


app.get("/work", function (req, res) {
    res.render("list", {listTitle: "Work List", newListItem: workItems});
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, () => {
  console.log('Server started on port 3000 ');
});