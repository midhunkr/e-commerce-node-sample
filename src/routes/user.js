const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = require("../auth/jwt_key");
const User = require("../models/user");
const e = require("express");
const user = require("../models/user");

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
            //encrypted password is sent and stored in the db for 
            //secuirity purposes
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {

                } else {
                    const newUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    }).save().then(result => {

                        res.status(201).json({
                            "message": "User is created",

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

router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(user => {
        if (!user.length) {
            return res.status(400).json("User does not exits")
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(400).json("User does not exits")
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    _id: user[0]._id
                },
                    jwtKey,
                    {
                        expiresIn: "1h"
                    }
                )
                return res.status(200).json({
                    "message": "Success",
                    "token":token
                })
            } else if (!result) {
                return res.status(400).json("User does not exits")
            }
        })
    }).catch(error => {
        return res.status(400).json("User does not exits")
    })
})

module.exports = router;