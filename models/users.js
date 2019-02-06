const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// user schema
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please fill in a valid email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']


    },
    first_name: {
        type: String,
        minlength: [2, "First Name must be more than 2 chars"],
        required: [true, 'First Name is required'],


    },
    last_name: {
        type: String,
        minlength: [2, "First Name must be more than 2 chars"],
        required: [true, 'Last Name is required'],

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipcode: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }


}, { timestamps: true });

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
    const query = { email : email }
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}