const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "gymbuddy";
const userCollection = ["users"];
const routineCollection = ["routines"];

const users = mongojs(databaseUrl, userCollection);
const routines = mongojs(databaseUrl, routineCollection);

users.on("error", error => {
  console.log("Database Error:", error);
});

routines.on("error", error => {
  console.log("Database Error:", error);
});


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
