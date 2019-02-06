const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Order = require('../models/orders');
var stripe = require("stripe")("sk_test_4Ai0aNCKBRP2xaRYPlsdW4DJ");

// get all orders
router.get('/all', function (req, res) {
  Order.find(function (err, orders) {
    if (err) { }
    else {
      console.log("~~~~~~~getting all of the orders~~~~~~~")
      res.json(orders)
    }
  })
})

// add products to order
router.post('/addItems', (req, res) => {
  // get the total amount for the order
  var price = 0;
  var totalAmount = 0;
  var order = req.body.items;
  function getAmount() {
    for (var i = 0; i < req.body.items.length; i++) {
      price = order[i].price
      totalAmount = totalAmount + price;

    }
    return totalAmount;
  }

  const orderInst = new Order();
  orderInst.products = req.body.items
  orderInst.amount = getAmount();
  orderInst.qty = req.body.items.length;
  orderInst.userName = req.body.userName;
  orderInst.email = req.body.email;
  orderInst.address = req.body.address;
  orderInst.city = req.body.city;
  orderInst.state = req.body.state;
  orderInst.zipcode = req.body.zipcode;
  orderInst.save((err, order) => {
    if (err) {
      res.json({
        status: false,
        err: err
      })
    }
    else {
      console.log("~~~~~ WE ADDED A NEW ORDER~~~~~ ", order)
      console.log("~~~~~total amount is~~~ ", totalAmount);
      console.log("~~~~~number of items in the order~~~~~~ ", req.body.items.length)
      // set total amount in session
      req.session.totalAmount = totalAmount;
      res.json({
        status: true,
        order
      })
    }
  })
})

// stripe charge and customer creation
router.post('/add', (req, res) => {
  var amount = req.session.totalAmount * 100;
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "Sample Charge",
        currency: "usd",
        customer: customer.id
      }))
    .then(charge => res.send(charge))
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send({ error: "Purchase Failed" });
    });
})


// get the number of orders in the DB
router.get('/count', (req, res) => {
  Order.find(function (err, orders) {
    if (err) { }
    else {
      console.log("~~~~getting all the orders to count them~~~~ ")
      let length = orders.length;
      res.json(length)
    }
  })
})

// get an order by ID
router.get('/order/:id', (req, res) => {
  const id = req.params.id;
  Order.findOne({ _id: id }, function (err, order) {
    if (err) {

    } else {
      res.json(
        order
      );
    }
  })
})

// edit an order by ID
router.put('/edit/:id', (req, res) => {
  Order.update({ _id: req.params.id }, { $set: { name: req.body.name, status: req.body.status, address: req.body.address, city: req.body.city, state: req.body.state, zipcode: req.body.zipcode } }, { runValidators: true }, (err, result) => {
    if (err) {
      res.json({
        status: false,
        err: err
      })
    }
    else {
      console.log("~~~ WE EDITED An Orderrr! ~~~~~~")
      res.json({
        status: true,
        result
      })
    }
  })
})

// delete and order by ID
router.delete('/destroy/:id', (req, res) => {
  Order.remove({ _id: req.params.id }, function (err, order) {
    if (err) { }
    else {
      console.log("~~~~we deleted the order!~~~~~")
      res.json(order)
    }
  })
})

// get an order by email
router.get('/orders/:id', (req, res) => {
  Order.find({ email: req.params.id }, (err, orders) => {
    if(err){ console.log("~~~error getting orders by email~~~~")}
    else {
      console.log("~~~~we got our orders by email~~~~~ ")
      res.json(orders)
    }
  })
})

module.exports = router;