const express = require('express');
const router = express.Router();
const db = require("../../models");

router.post('/', (req, res) => {
  console.log(req.body.name, req.body.password)
  db.login.findOne({
    where: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(details => {
    console.log(details)
    if (!details) {
      return res.status(400).json({ msg: 'No Records Found' });
    }
    //details = details.map(details => details.dataValues) if we use findall we can use map
    console.log(details)
    if (details.dataValues.isadmin == true) {
      res.send(details)
    }
    else {
      db.candidatedetails.findOne({
        where: {
          loginid: details.dataValues.id
        }
      }).then(candidatedetails => {
        if (!candidatedetails) {
          return res.status(400).json({ msg: 'No Candidate details Found' });
        }
        //candidatedetails = candidatedetails.map(candidatedetails => candidatedetails.dataValues)
        else {
          console.log(candidatedetails);
          var data = {
            candidateid:candidatedetails.dataValues.id,
            name: details.dataValues.name,
            password: details.dataValues.password,
            votecount: details.dataValues.votecount,
            isadmin: false,
            voted: details.dataValues.voted,
            loginid: candidatedetails.dataValues.loginid,
            challengessolved: candidatedetails.dataValues.challengessolved,
            expertlevel: candidatedetails.dataValues.expertlevel,
            ds: candidatedetails.dataValues.ds,
            algorithm: candidatedetails.dataValues.algorithm,
            c: candidatedetails.dataValues.c,
            java: candidatedetails.dataValues.java,
            phyton: candidatedetails.dataValues.phyton,
          };
        }
        res.send(data)
      });
    }
  });
});

module.exports = router;