const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/users');

// Register
router.post('/register', (req, res, next)=>{
    let newUser = new User({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : req.body.password
    });
    User.addUser(newUser, (err, user)=>{
        if(err){
            res.json({
                success: false,
                msg: 'failed to register user'
            })
        } else {
            res.json({
                success: true,
                msg: 'User registered'
            })
        }
    })
});

// Authenticate
router.post('/authenticate', (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.getUserByEmail(email, (err, user)=>{
        if(err) throw err;
        if(!user){
            return res.json({
                success: false,
                msg:"user not found"
            })
        } 
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 3600 
                })
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        email: user.email,
                        first_name: user.first_name
                    }
                })
            } else {
                return res.json({
                    success: false,
                    msg:"wrong password"
                })
            }
        })
    })
});

// get profile
router.get('/profile', passport.authenticate('jwt', {session:false}),(req, res, next)=>{
    res.json({user: req.user});
});

// get all users
router.get('/all', function (req, res) {
    User.find(function (err, users) {
        if (err) { }
        else {
            console.log("~~~~getting all the users~~~~")
            res.json(users)
        }
    })
})

// delete user
router.delete('/destroy/:id', function (req, res) {
    User.remove({ _id: req.params.id }, function (err, user) {
        if (err) { }
        else {
            console.log("~~~~we deleted a User~~~~~")
            res.json(user)
        }
    })
})

// get user by id for edit
router.get('/user/:id',(req, res, next)=>{
    const id = req.params.id;
    User.findOne({ _id: id }, function (err, user){
        if(err){

        } else {
            res.json(
                user
                );
        }
    })
    
});

// update user
router.put('/edit/:id', function (req, res) {
    User.update({ _id: req.params.id }, { $set: { email: req.body.email, first_name: req.body.first_name, last_name: req.body.last_name, isAdmin: req.body.isAdmin } }, { runValidators: true }, (err, result) => {
        if (err) {
            res.json({
                status: false,
                err: err
            })
        }
        else {
            console.log("~~~~~ WE EDITED A User! ~~~~~")
            res.json({
                status: true,
                result
            })
        }
    })
})

module.exports = router;