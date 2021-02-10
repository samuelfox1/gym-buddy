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

//=========================== ROUTES ==============================

app.get('/session', (req, res) => {
  if (req.session.user) { res.json(req.session.user) }
  else { res.json(false) }
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.json('goodbye')
})

//=========================== EXERCISE ROUTES ==============================
//=========================== ROUTINE ROUTES ==============================
//=========================== USER ROUTES ==============================

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




//TODO: post request to /api/routine to add routines on form submit
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

// SAVED ROUTINES UL
//TODO: get request /api/routine to get saved routines and populate a ul with an li for each saved routine
app.get('/api/routine', (req, res) => {
  if (req.session.user) {
    const username = req.session.user.username

    db.User.find({ username: username })
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



//TODO: when a routine is selected, get request to api/routine/:id, then fade out routines div, fade in selected routine div

// SELECTED ROUTINE DIV 
//TODO: each routine div has static form to add exercise
//TODO: post request to /api/exercise to add exercises to routines
//TODO: each routine card has an edit title button
//TODO: each routine card has a delete routine button

//SAVED EXERCISES UL
//TODO: get request to /api/exercises to get saved exercises and populate a ul with an li for each exercise
//TODO: each exercise has title, type, weight, sets, reps, duration, cardio toggle w/ distance if isCardio
//TODO: each exercise li has edit button, make the form look like the li, to activate/deactivate the text field. the edit button doubles as the submit button
//TODO: each exercise li has delete button


app.listen(PORT, () => {
  console.log("App running on port 3000!");
});



// to interact with your mongoDB database, as instructed below.
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

// 1. Save a note to the database's collection
// POST: /submit
// ===========================================
// app.post('/submit', (req, res) => {
//   db.notes.insert(req.body, (err, data) => {
//     if (err) {
//       console.log(err)
//       res.status(500).send("error")
//     } else {
//       res.json(data)
//     }
//   })
// })

// 2. Retrieve all notes from the database's collection
// GET: /all
// ====================================================
// app.get('/all', (req, res) => {
//   db.notes.find((err, data) => {
//     if (err) {
//       console.log(err)
//       res.status(500).send("error")
//     } else {
//       res.json(data)
//     }
//   })
// })

// 3. Retrieve one note in the database's collection by it's ObjectId
// TIP: when searching by an id, the id needs to be passed in
// as (mongojs.ObjectId(IdYouWantToFind))
// GET: /find/:id
// ==================================================================
// app.get('/find/:id', (req, res) => {
//   db.notes.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, data) => {
//     if (err) {
//       console.log(err)
//       res.status(500).send("error")
//     } else {
//       res.json(data)
//     }
//   })
// })



// 4. Update one note in the database's collection by it's ObjectId
// (remember, mongojs.ObjectId(IdYouWantToFind)
// POST: /update/:id
// ================================================================
// app.post('/update/:id', (req, res) => {
//   db.notes.update({ _id: mongojs.ObjectId(req.params.id) }, req.body, (err, data) => {
//     if (err) {
//       console.log(err)
//     } else {
//       res.json(data)
//     }
//   })
// })


// 5. Delete one note from the database's collection by it's ObjectId
// (remember, mongojs.ObjectId(IdYouWantToFind)
// DELETE: /delete/:id
// ==================================================================

// 

// 6. Clear the entire note collection
// DELETE: /clearall
// ===================================

// app.delete("/clearall", (req, res) => {
//   db.notes.remove({}, req.body, (err, data) => {
//     if (err) {
//       console.log(err)
//     } else {
//       res.json(data)
//     }
//   })
// })