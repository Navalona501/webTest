const express = require('express');

const app = express();

app.get("/", function(req, res){
    res.send("<h1>hello</h1>");
});

app.get("/contact", function(req, res){
    res.send("Contact me at: nav@gmail.com");
});

app.get("/about", function(req, res){
    res.send("My name is Navalona");
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});