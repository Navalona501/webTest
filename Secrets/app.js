require('dotenv').config();
var md5 = require('md5');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

// const bcrypt = require('bcrypt');
// const encrypt = require('mongoose-encryption');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(session({
  secret: 'trash is my secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000 // 1 heure en millisecondes
  }
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/userDB', { useNewUrlParser: true }).then(() => {
  console.log('MongoDB Connected');
}).catch((err) => {
  console.log(err);
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
  
  res.render('home');
});


app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/secrets', (req, res) => {
  User.find({ secret: {$ne: null} }).then((users) => {
    if(users){
      res.render('secrets', {usersWithSecrets: users});
    }else{
      res.render('secrets', {usersWithSecrets: "no secrets yet"});
    }
  }).catch((err) => {
    console.log(err);
  });
});

app.get('/submit', (req, res) => {
  if(req.isAuthenticated()){
    res.render('submit');
  } else {
    res.redirect('/login');
  }
});

app.post('/submit', (req, res) => {
  const submittedSecret = req.body.secret;
  User.findById(req.user.id).then((user) => {
    if(user){
      user.secret = submittedSecret;
      user.save();
      res.redirect('/secrets');
    }else{
      res.redirect('/login');
    }
  }).catch((err) => {
    console.log(err);
  });
});

app.post('/register', (req, res) => {
  User.register({ username: req.body.username }, req.body.password, (err, user) => {
    if(err){
      console.log(err);
      res.redirect('/register');
    }else{
      passport.authenticate('local')(req, res, () => {
        res.redirect('/secrets');
      });
    }
  });
});

app.post('/login', (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, (err) => {
    if(err){
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/secrets');
      });
    }
  });
});



app.get('/logout', (req, res) => {
  req.logout(function(err) {
    if(err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

app.route('/api/login').get((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  // retourne un access token si succès
  
});

app.listen(3000, () => {
  console.log('Server started on port 3000 ');
});

// app.post('/register', (req, res) => {
//   bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
//     const newUser = new User({
//       email: req.body.username,
//       password: hash
//     });

//     newUser.save().then(() => {
//       res.render('secrets');
//     }).catch((err) => {
//       console.log(err);
//     });

//   });
  
  
// });

// app.post('/login', (req, res) => {

//   const username = req.body.username;
//   const password = req.body.password;
//   User.findOne({ email: username }).then((user) => {
//     if (!user) {
//       res.render('login');
//     }else{
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (result === true) {
//           res.render('secrets');
//         } else {
//           res.render('login');
//         }
//       })
//     }
//   }).catch((err) => {
//     console.log(err);
//   });
// });

// app.route('/api/login').get((req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   User.findOne({ email: email }).then((user) => {
//     if(!user){
//       res.send("User not found");
//     } else {
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (result === true) {
//           res.send("User connected");
//         } else {
//           res.send("Incorrect password");
//         }
//       });
//     }
    
//   }).catch((err) => {
//     console.log(err);
//   });
// });