const mongoose = require('mongoose');
const config = require('../config/database');


const Schema = mongoose.Schema;


const OrderSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipcode: {
        type: String
    },
    products: [],
    amount: {
        type: Number
    },
    status:{
        type: String,
        default: 'Pending'
    },
    qty: {
        type: Number
    }
   


}, {timestamps: true});

module.exports = mongoose.model('Order', OrderSchema);