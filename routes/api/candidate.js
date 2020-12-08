const express = require('express');
const router = express.Router();
const db = require("../../models");


// Gets All Candidates
router.get('/', (req, res) => {
  db.login.findAll({ include: [db.candidatedetails] }).then(details => res.send(details));
});

// Get Single Candidate
router.get('/:id', (req, res) => {
  db.candidatedetails.findOne({
    where: {
      id: req.params.id
    }
  }).then(details => res.send(details));
});

// Create Candidate
router.post('/', (req, res) => {

  if (req.body.role == 'admin') {
    console.log(req.body)
    db.login.create({
      name: req.body.name,
      password: req.body.password,
      votecount: 0,
      isadmin: true,
      voted: false
    }).then(details => {
      res.send(true);
    });
  } else {
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
        db.candidatedetails.create({
          loginid: details.dataValues.id,
          challengessolved: req.body.challengessolved,
          expertlevel: req.body.expertlevel,
          ds: req.body.ds,
          algorithm: req.body.algorithm,
          c: req.body.c,
          java: req.body.java,
          phyton: req.body.phyton,
        }).then(details => {
          console.log(details.dataValues)
          if (!details) {
            return res.status(400).json({ msg: 'No candidate details inserted' });
          }
          else {
            res.send(true);
          }
        })
      }
    });
  }
});

// Update Candidate
router.put('/:id', (req, res) => {
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
      where: { id: req.params.id }
    }
  ).then((details) => {
    if (details == 1) {
      db.candidatedetails.findOne({
        where: {
          id: req.params.id
        }
      }).then(details => {
        console.log(details)
        if (req.body.name || req.body.password) {
          db.login.update(
            {
              name: req.body.name,
              password: req.body.password,
            },
            {
              where: { id: details.dataValues.loginid }
            }
          ).then(() => res.send("success"));
        }
        res.send(details)
      });
    }
    else {
      return res.status(400).json({ msg: 'No data found for the given id' });
    }
  });

});

// Delete Candidate
router.delete('/:id', (req, res) => {
  var data;
  db.candidatedetails.findOne({
    where: {
      id: req.params.id
    }
  }).then(details => {
    data = details.dataValues
  });
  db.candidatedetails.destroy({
    where: {
      id: req.params.id
    }
  }).then((details) => {
    console.log(data)
    if (details == 1) {
      db.login.destroy({
        where: {
          id: data.loginid
        }
      })
      res.send(true)
    }
    else {
      return res.status(400).json({ msg: 'No data found for the given id' });
    }
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