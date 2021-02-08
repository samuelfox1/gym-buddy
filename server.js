const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const bcrypt = require("bcrypt");
const session = require("express-session");
require("dotenv").config();


const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,

    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
    },
  })
);

app.use(express.static("public"));

const databaseUrl = "gymbuddy";
const collection = ["users", "routines"];
const db = mongojs(databaseUrl, collection);


db.on("error", error => {
  console.log("Database Error:", error);
});


app.get('/api/session', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user)
  } else {
    res.json(false)
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})


app.post('/signUp', (req, res) => {

  db.users.find({}, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send("error")
    } else {
      let uniqueUsername = true
      data.forEach(x => {
        if (x.username === req.body.username) { uniqueUsername = false }
      });
      if (!uniqueUsername) {
        res.json(false)
      } else {
        db.users.insert({
          username: req.body.username,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
        }, (err, data) => {
          if (err) {
            console.log(err)
            res.status(500).send("error")
          } else {
            res.json(true)
          }
        })
      }
    }
  })
})


app.post('/login', (req, res) => {
  db.users.findOne({
    username: req.body.username
  }, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send("error")
    } else {
      if (bcrypt.compareSync(req.body.password, data.password)) {
        req.session.user = {
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
        }
        res.json(data.first_name)
      } else {
        res.json(false)
      }
    }
  })
})




// TODO: You will make six more routes. Each will use mongojs methods
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

// Listen on port 3000
app.listen(3000, () => {
  console.log("App running on port 3000!");
});
