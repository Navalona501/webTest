const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const { json } = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    var crypto = "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + req.body.crypto + req.body.fiat;
    const options = {
        url: 'https://apiv2.bitcoinaverage.com/convert/global',
        method: 'GET',
        qs:{
            from: req.body.crypto,
            to: req.body.fiat,
            amount: req.body.amount
        },
        headers: {
          'x-ba-key': 'YzdlODEwN2MzMmE0NDQzMmJjZjliZTI1OTczNmQ0Y2M'
        }
      };
    request(options, function (error, response, body) {
        var data = JSON.parse(body);
        var price = data.price;
        res.send("<h1>The current price of Bitcoin is " + price + " USD</h1>");
    });

    // res.write("<p>this is it</p>");
    // res.write("<h1>The current price of Bitcoin is "  + " USD</h1>");
    // res.send();
});
// app.post("/", function (req, res) {
//     request("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD", function (error, response, body) {
//         var data = JSON.parse(body);
//         console.log(data.last);
//     });
// });


// var price = data.last;
// console.log(price);
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});