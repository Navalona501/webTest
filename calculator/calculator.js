const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    // console.log(__dirname);
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    var num1 = req.body.num1;
    var num2 = req.body.num2;
    var result = Number(num1) + Number(num2);
    res.send("The result of the calculation is " + result);
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});