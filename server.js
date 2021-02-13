const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const mongojs = require("mongojs");
const logger = require("morgan");
const bcrypt = require("bcrypt");
require("dotenv").config();


// setup express router and data parsing
const PORT = process.env.PORT || 8080;
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// set mongoDB source and connect collection model files
const db = require("./models");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gymbuddy", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//session settings
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 2, }
  })
);



//=========================== UTILITY ROUTES ==============================
app.get('/session', (req, res) => {
  if (req.session.user) { res.json(req.session.user) }
  else { res.json(false) }
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.json('goodbye')
})

app.post('/signUp', (req, res) => {
  let uniqueUsername = true
  let uniqueEmail = true
  db.User.find({}, (err, data) => {
    if (err) { console.log(err), res.status(500).send("error") }
    else {
      data.forEach(x => {
        if (x.username === req.body.username) { uniqueUsername = false }
        if (x.email === req.body.email) { uniqueEmail = false }
      });
    }
    if (uniqueUsername && uniqueEmail) {
      db.User.create({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
      }, (err, data) => {
        if (err) { console.log(err), res.status(500).json(err) }
        else { res.json({ username: uniqueUsername, email: uniqueEmail }) }
      })
    } else { res.json({ username: uniqueUsername, email: uniqueEmail }) }
  })
})

app.post('/login', (req, res) => {
  db.User.findOne({ username: req.body.username }, (err, data) => {
    if (err) { console.log(err), res.status(500).send("error") }
    if (data) {
      if (bcrypt.compareSync(req.body.password, data.password)) {
        req.session.user = {
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
        }
        res.json(data.first_name)
      } else { res.json(false) }
    } else { res.json(false) }
  })
})


//=========================== ROUTINE ROUTES ==============================
app.get('/api/routine', (req, res) => {
  if (req.session.user) {
    const username = req.session.user.username

    db.User.findOne({ username: username })
      .populate('routines')
      .then(data => { res.json(data) })
      .catch(err => { res.json(err) })
  } else { res.json('please login') }
})

app.get('/api/routine/:id', (req, res) => {
  if (req.session.user) {
    db.Routine.findOne({ _id: mongojs.ObjectId(req.params.id) })
      .populate('exercises')
      .then(data => { res.json(data) })
      .catch(err => { res.json(err) })
  } else { res.json('please login') }
})

app.post('/api/routine/:id', (req, res) => {
  if (req.session.user) {
    const username = req.session.user.username
    if (req.params.id === 'new') {
      db.Routine.create(req.body)
        .then(({ _id }) => db.User.findOneAndUpdate({ username: username }, { $push: { routines: _id } }, { new: true }))
        .then(data => { res.json(data) })
        .catch(err => { res.json(err) })
    } else { console.log(req.params.id) }
  } else { res.json('please login') }
})

app.put('/api/routine/:id', (req, res) => {
  console.log(req.body)
  if (req.session.user) {
    db.Routine.findByIdAndUpdate({ _id: mongojs.ObjectId(req.params.id) }, { $set: { title: req.body.title } })
      .then(data => { res.json(data) })
      .catch(err => { res.json(err) })
  } else { res.json('please login') }
})

app.delete('/api/routine/:id', (req, res) => {
  console.log(req.body)
  if (req.session.user) {
    db.Routine.findByIdAndDelete({ _id: mongojs.ObjectId(req.params.id) })
      .then(data => { res.json(data) })
      .catch(err => { res.json(err) })
  } else { res.json('please login') }
})


//=========================== EXERCISE ROUTES ==============================
app.post('/api/exercise', (req, res) => {
  if (req.session.user) {
    db.Exercise.create(req.body)
      .then(({ _id }) => db.Routine.findOneAndUpdate({ _id: req.body.id }, { $push: { exercises: _id } }, { new: true }))
      .then(data => { res.json(data) })
      .catch(err => { res.json(err) })
  } else { res.json('please login') }
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
