const mongoose = require('mongoose');
const config = require('../config/database');

var ProductSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, "Brand name is required"]
    },
    name: {
        type: String,
        minlength: [3, "name has to be more than 3 chars"],
        required: [true, "name is required"]
        
    },
    image: {
        type: String,
        required: [true, "image is required"]

    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },

    category: {
        type: String,
        required: [true, "category is required"]
    },

    inventory: {
        type: Number,
        required: [true, "inventory count is required"]
    }

}, { timestamps: true });


// module.exports = mongoose.model('Product', ProductSchema);

const Product = module.exports = mongoose.model('Product', ProductSchema);



// module.exports = {

//     getProducts(req, res){
//         Product.find({}, function(err, data){
//             if(err){
//                 console.log("Error retrieving products", err)
//                 res.json(err)
//             } else {
//                 res.json(data)
//             }
//         })
//     },

//     getOne(req, res){
//         console.log("req.params>", req.params)
//         Product.findOne({_id: req.params.id}, function(err, thisProduct){
//             if(err){
//                 console.log("Error retrieving product", err)
//                 res.json(err)
//             } else {
//                 res.json(thisProduct)
//             }
//         })
//     },

//     create(req, res){
//         console.log("Products Controller> req.body", req.body)
//         const product = new Product ({
//             name: req.body.name,
//             qty: req.body.qty,
//             price: req.body.price,
//         })
//         product.save()
//             .then(function(newProduct){
//                 console.log("new product created", newProduct)
//                 res.json(newProduct)
//             })
//             .catch(error => {
//                 const errors = Object.keys(error.errors)
//                 .map(key => error.errors[key].message)
//                 console.log("+++++++",errors,"+++++++")
//                 res.json({error: errors})
//             })
//     },

//     destroy(req, res){
//         Product.findOneAndRemove({_id: req.params.id}, function(err){
//             if(err){
//                 console.log("Err in destroy", err)
//                 res.json(err)
//             } else {
//                 console.log("successful destroy")
//                 res.json(true)
//             }
//         })
//     },

//     update(req, res){
//         console.log(req.body)
//         Product.findById(req.body._id, function(err, product){
//             if(err){
//                 console.log("err in update", err)
//                 res.json(err)
//             } else {
//                 product.name = req.body.name;
//                 product.qty = req.body.qty;
//                 product.price = req.body.price
//                 product.save()
//                 .then(function(updatedProduct){
//                     console.log("product updated", updatedProduct)
//                     res.json(updatedProduct)
//                 })
//                 .catch(error => {
//                     // mongoose error handling
//                     const errors = Object.keys(error.errors)
//                     .map(key => error.errors[key].message)
//                     console.log("+++++++",errors,"+++++++")
//                     res.json({error: errors})
//                 })
//                 console.log(product)
//             }
//         })
//     }
// }

