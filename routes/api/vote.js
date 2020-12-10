const express = require('express');
const router = express.Router();
const db = require("../../models");

router.post('/', (req, res) => {
    var temploginddata;
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
                            console.log(candidatedetails)
                            if (candidatedetails == null) {
                                console.log(candidatedetails)
                                return res.status(200).json({ msg: 'admin' });
                            }
                            //candidatedetails = candidatedetails.map(candidatedetails => candidatedetails.dataValues)
                            else {
                                var data = {
                                    name: "",
                                    password: "",
                                    votecount: 0,
                                    isadmin: false,
                                    voted: false,
                                    loginid: candidatedetails.dataValues.loginid,
                                    challengessolved: candidatedetails.dataValues.challengessolved,
                                    expertlevel: candidatedetails.dataValues.expertlevel,
                                    ds: candidatedetails.dataValues.ds,
                                    algorithm: candidatedetails.dataValues.algorithm,
                                    c: candidatedetails.dataValues.c,
                                    java: candidatedetails.dataValues.java,
                                    phyton: candidatedetails.dataValues.phyton,
                                };
                                db.login.findOne({
                                    where: {
                                        id: candidatedetails.dataValues.loginid,
                                    }
                                }).then(logindata => {
                                    data.name = logindata.dataValues.name;
                                    data.password = logindata.dataValues.password;
                                    data.votecount = logindata.dataValues.votecount;
                                    data.voted = logindata.dataValues.voted;
                                    res.send(data)
                                });
                            }
                            console.log(data)

                        });
                    })
            });
    });
});
module.exports = router;