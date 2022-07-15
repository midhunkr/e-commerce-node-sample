const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user")

router.post('/signup', (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json("Bad request")
    }
    User.find({ email: req.body.email }).exec().then(result => {
        if (result.length) {
            return res.status(409).json({
                "message": "Duplicate data exits"
            })
        } else {
            //10 rounds of salt is safe
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {

                } else {
                    const newUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    }).save().then(result => {
                        res.status(201).json({
                            "message": "User is created"
                        })
                    }).catch(error => {
                        res.status(500).json({
                            "error": "Internal error"
                        })
                    })
                }
            })
        }
    }).catch(error => {

    })




});

module.exports = router;