const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/userDB', { useNewUrlParser: true }).then(() => {
  console.log('MongoDB Connected');
}).catch((err) => {
  console.log(err);
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const secret = 'Thisisasecret!';

userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

const User = new mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });

  newUser.save().then(() => {
    res.render('secrets');
  }).catch((err) => {
    console.log(err);
  })
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ email: username }).then((user) => {
    if (user.password === password) {
      res.render('secrets');
    } else {
      res.render('login');
    }
  }).catch((err) => {
    console.log(err);
  });
});

app.route('/api/login').get((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if(!user){
      res.send("User not found");
    } else {
      if(user.password === password){
        res.send("User connected");
      } else {
        res.send("Incorrect password");
      }
    }
    
  }).catch((err) => {
    console.log(err);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000 ');
});