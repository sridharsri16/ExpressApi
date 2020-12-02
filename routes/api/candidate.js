const express = require('express');
const router = express.Router();
const db = require("../../models");


// Gets All Candidates
router.get('/', (req, res) => {
  db.candidatedetails.findAll().then(details => res.send(details));
});

// Get Single Candidate
router.get('/:id', (req, res) => {
  db.candidatedetails.findAll({
    where: {
      id: req.params.id
    }
  }).then(details => res.send(details));
});

// Create Candidate
router.post('/', (req, res) => {
  db.login.create({
    name: req.body.name,
    password: req.body.password,
    votecount: 0,
    isadmin: false,
    voted: false
  }).then(details => {
    if (!details) {
      return res.status(400).json({ msg: 'No data inserted' });
    }
    else {
      details = details.map(details => details.dataValues)
      db.candidatedetails.create({
        loginid: details[0].id,
        challengessolved: req.body.challengessolved,
        expertlevel: req.body.expertlevel,
        ds: req.body.ds,
        algorithm: req.body.algorithm,
        c: req.body.c,
        java: req.body.java,
        phyton: req.body.phyton,
      })
    }
    res.send(true);
  });
});

// Update Candidate
router.put('/:id', (req, res) => {
  let done = false;
  db.candidatedetails.update(
    {
      challengessolved: req.body.challengessolved,
      expertlevel: req.body.expertlevel,
      ds: req.body.ds,
      algorithm: req.body.algorithm,
      c: req.body.c,
      java: req.body.java,
      phyton: req.body.phyton,
    },
    {
      where: { id: req.body.candidateid }
    }
  ).then((details) => {
    details = details.map(details => details.dataValues)
    done = true
    if ((req.body.name && req.body.password) && done) {
      db.login.update(
        {
          name: req.body.name,
          password: req.body.password,
        },
        {
          where: { id: details[0].id }
        }
      ).then(() => done = true);
      res.send("success")
    }
  });

});

// Delete Candidate
router.delete('/:id', (req, res) => {
  db.candidatedetails.destroy({
    where: {
      id: req.params.id
    }
  }).then((details) => {
    details = details.map(details => details.dataValues)
    db.login.destroy({
      where: {
        id: details[0].loginid
      }
    })
    res.send(true)
  });
});

module.exports = router;

// const db = require("../models");

// // get all todos
// router.get("/all", (req, res) => {
//   db.Todo.findAll().then(todos => res.send(todos));
// });

// // get single todo by id
// router.get("/find/:id", (req, res) => {
//   db.Todo.findAll({
//     where: {
//       id: req.params.id
//     }
//   }).then(todo => res.send(todo));
// });

// // post new todo
// router.post("/new", (req, res) => {
//   db.Todo.create({
//     text: req.body.text
//   }).then(submitedTodo => res.send(submitedTodo));
// });

// // delete todo
// router.delete("/delete/:id", (req, res) => {
//   db.Todo.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(() => res.send("success"));
// });

// // edit a todo
// router.put("/edit", (req, res) => {
//   db.Todo.update(
//     {
//       text: req.body.text
//     },
//     {
//       where: { id: req.body.id }
//     }
//   ).then(() => res.send("success"));
// });

// module.exports = router;