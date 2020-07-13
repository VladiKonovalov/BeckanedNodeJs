const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = {

    signup: (req, res) => {
        const { username, password, isAdmin } = req.body;
        User.find({ username }).then((users) => {
            if (users.length >= 1) {
                return res.status(409).json({
                    message: 'This Username already exist'
                })
            }
            bcrypt.hash(password, 10, (error, hash) => {
                if (error) {
                    return res.status(500).json({
                        error
                    })
                }
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username,
                    password: hash,
                    isAdmin
                });

                user.save().then((result) => {
                    console.log(result);

                    res.status(200).json({
                        message: 'new user Created'
                    })
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                });
            });
        })




    },

    login: (req, res) => {
        
        const { username, password } = req.body;

        User.find({ username }).then((users) => {
            if (users.length === 0) {
                return res.status(401).json({
                    message: 'failed to login'
                });
            }
            const [user] = users;
            bcrypt.compare(password, user.password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: 'failed to login'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        id: user._id,
                        username: user.username,
                        isAdmin :user.isAdmin
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    })
   
                    return res.status(200).json({
                        message: 'login succesfuly',
                        token
                    })
                }
                 res.status(401).json({
                    message: 'failed to login'
                });
            })
        })

    }
}