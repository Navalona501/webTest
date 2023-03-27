const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');



mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.log('Error connecting to database: ', err);
});


const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);

// Fruit.find().then((fruits)=>{
//   // console.log(fruits);
//   fruits.forEach(element => {
//     console.log(element.name);
//   });
//   mongoose.connection.close();
// }).catch((err)=>{
//   console.log(err);
// });

// Fruit.updateOne({name: "banana"}, {review: "hyper good"}).then(()=>{
//   console.log("updated");
// }).catch((err)=>{console.log(err);});

// Fruit.deleteOne({name: "banana"}).then(()=>{
//   console.log("deleted");
// }).catch((err)=>{console.log(err);});

// const fruit1 = new Fruit({
//     name: "Apple",
//     rating: 7,
//     review: "Great fruit"
// });

// fruit1.save();

const Strawbery = new Fruit({
  name: "Strawbery",
  rating: 10,
  review: "Greatest fruit ever"
});

Strawbery.save();

const personSchema = mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = new mongoose.model("Person", personSchema);

Person.updateOne({name: "Jhon"}, {favouriteFruit: Strawbery}).then(()=>{
  console.log("updated");
}).catch((err)=>{console.log(err);});

// const guy = new Person({
//   name: "Jhon",
//   age: 37
// });

// guy.save().then(()=>{
//   console.log("saved");
// }).catch((err)=>{
//   console.log("Error Happened: " + err);
// });



app.listen(3000, () => {
  console.log('Server started on port 3000 ');
});
