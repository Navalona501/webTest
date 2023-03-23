const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.log('Error connecting to database: ', err);
});


// const fruitSchema = new mongoose.Schema({
//     name: String,
//     rating: Number,
//     review: String
// });

// const Fruit = mongoose.model('Fruit', fruitSchema);

// const fruit1 = new Fruit({
//     name: "Apple",
//     rating: 7,
//     review: "Great fruit"
// });

// fruit1.save();


app.listen(3000, () => {
  console.log('Server started on port 3000 ');
});
