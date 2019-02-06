const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Product = require('../models/products');


// get all products
router.get('/all', function (req, res) {
    Product.find(function (err, products) {
        if (err) { }
        else {
            console.log("~~~~getting all the products~~~~")
            res.json(products)
        }
    })
})
// get a product for edit
router.get('/product/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findOne({ _id: id }, function (err, product) {
        if (err) {

        } else {
            res.json(
                product
            );
        }
    })

});

// add new product
router.post('/addNewProduct', (req, res) => {
    const product_inst = new Product();
    product_inst.brand = req.body.brand;
    product_inst.name = req.body.name;
    product_inst.price = req.body.price;
    product_inst.image = req.body.image;
    product_inst.category = req.body.category;
    product_inst.inventory = req.body.inventory;
    product_inst.description = req.body.description;
    product_inst.save((err, result) => {
        if (err) {
            res.json({
                status: false,
                err: err
            })
        } else {
            console.log("~~~~~added a product to db!~~~~~" + result)
            res.json({
                success: true,
                msg: "product added to db",
                result
            })
        }
    })
})


// // edit a product by ID
router.put('/edit/:id', function (req, res) {
    Product.update({ _id: req.params.id }, { $set: { brand: req.body.brand, name: req.body.name, price: req.body.price, image: req.body.image, category: req.body.category, inventory: req.body.inventory, description: req.body.description } }, { runValidators: true }, (err, result) => {
        if (err) {
            res.json({
                status: false,
                err: err
            })
        }
        else {
            console.log("~~~~~ WE EDITED A PRODUCT By ID! ~~~~~")
            res.json({
                status: true,
                result
            })
        }
    })
})
// // delete a product by ID
router.delete('/destroy/:id', function (req, res) {
    Product.remove({ _id: req.params.id }, function (err, product) {
        if (err) { }
        else {
            console.log("~~~~~~we deleted the product!~~~~~")
            res.json(product)
        }
    })
})
module.exports = router;