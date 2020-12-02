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
        details = details.map(details => details.dataValues)
        db.login.update(
            {
                votecount: details[0].votecount + 1
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
                            if (!candidatedetails) {
                                return res.status(400).json({ msg: 'Admin' });
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
                    })
            });
    });
});
module.exports = router;