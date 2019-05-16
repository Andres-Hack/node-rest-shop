const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Order = require('../models/order');
const Product = require('../models/product')

router.get('/', checkAuth, (req, res, next) => {
    Order.find({}, (err, docs) => {
        if (!err) {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/'+doc._id
                        }
                    }
                })
            });
        } else {
            res.status(500).json({"Error": err});     
        }
    });
});

router.post('/', checkAuth, (req, res, next) => {
    const order =  new Order({
        _id : mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order.save((err, docs) => {
        if (!err){
            console.log('Success!');
            res.status(201).json(docs);     
        }else{
            res.status(500).json({"Error": err});     
        }
    });
});

router.get('/:orderId', checkAuth, (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id, (err, docs) => {
        if (!err) {
            res.status(200).json({
                count: docs.length,
                orders: {
                        _id: docs._id,
                        product: docs.product,
                        quantity: docs.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/'+docs._id
                        }
                    }
                });
        }else{
            res.status(404).json({"message": "ID no valido"})
        }
    })
});

router.patch('/:orderId', checkAuth, (req, res, next) => {
    const id = req.params.orderId;
    Product.updateOne({ _id: id}, { $set: { quantity: req.body.newQuantity, product: req.body.newProduct } }, (err, docs) => {
        if (!err) {
            res.status(200).json(docs)
        } else {
            res.status(500).json({"Error": err})
        }
    });        
});

router.delete('/:orderId', checkAuth, (req, res, next) => {
    const id = req.params.orderId;
    Order.deleteOne({ _id: id}, (err) => {
        if (!err) {
            res.status(200).json({"message": "Se elimino satisfactoriamente"});
        } else {
            res.status(500).json({"Error": err});
        }
    });       
});

module.exports = router;