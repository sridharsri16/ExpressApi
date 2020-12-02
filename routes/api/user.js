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
    if (!details) {
      return res.status(400).json({ msg: 'No Records Found' });
    }
    details = details.map(details => details.dataValues)
    console.log(details)
    if (details[0].isadmin == true) {
      res.send(details)
    }
    else {
      db.candidatedetails.findOne({
        where: {
          loginid: details[0].id
        }
      }).then(candidatedetails => {
        if (!candidatedetails) {
          return res.status(400).json({ msg: 'No Candidate details Found' });
        }
        candidatedetails = candidatedetails.map(candidatedetails => candidatedetails.dataValues)
        console.log(candidatedetails);
        let data = {
          name: details[0].name,
          password: details[0].password,
          votecount: details[0].votecount,
          isadmin: false,
          voted: details[0].voted,
          loginid: candidatedetails[0].loginid,
          challengessolved: candidatedetails[0].challengessolved,
          expertlevel: candidatedetails[0].expertlevel,
          ds: candidatedetails[0].ds,
          algorithm: candidatedetails[0].algorithm,
          c: candidatedetails[0].c,
          java: candidatedetails[0].java,
          phyton: candidatedetails[0].phyton,
        };

        res.send(data)
      });
    }
  });
});

module.exports = router;