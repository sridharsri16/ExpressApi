const express = require('express');
const router = express.Router();
const db = require("../../models");

router.post('/', (req, res) => {
    console.log(req.body.whovoted, req.body.votedfor)
    db.login.findOne({
        where: {
            id: req.body.votedfor,
        }
    }).then(details => {
        if (!details) {
            return res.status(400).json({ msg: 'No Candidate Found' });
        }
        //details = details.map(details => details.dataValues) if we use findall we can use map
        db.login.update(
            {
                votecount: details.dataValues.votecount + 1
            },
            {
                where: { id: req.body.votedfor, }
            }).then(() => {
                db.login.update(
                    {
                        voted: true
                    },
                    {
                        where: { id: req.body.whovoted, }
                    }).then(() => {
                        db.candidatedetails.findOne({
                            where: {
                                loginid: req.body.whovoted,
                            }
                        }).then(candidatedetails => {
                            console.log(candidatedetails);
                            if (!candidatedetails) {
                                return res.status(400).json({ msg: 'Admin' });
                            }
                            //candidatedetails = candidatedetails.map(candidatedetails => candidatedetails.dataValues)
                            else {
                                var data = {
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
                    })
            });
    });
});
module.exports = router;