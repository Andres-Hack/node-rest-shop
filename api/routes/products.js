const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

// CONFIGURACION PARA GUARDAR LA IMAGEN
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)    
    }else{
        cb(null, false)
    }    
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});

const Product = require('../models/product')

// RUTA PARA LLAMARA A TODA LA COLECCION
router.get('/', (req, res, next) => {
    Product.find({}, (err, docs) => {
        if (!err) {
            res.status(200).json(docs);     
        } else {
            res.status(500).json({"Error": err});     
        }
    });
});

//RUTA PARA CREAR UNA COLECCION
router.post('/', checkAuth, upload.single('productImage'), (req, res, next) => {
    //++++++ Mensaje ++++++//
    console.log(req.file);
    //+++++++++++++++++++++//
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save((err, docs) => {
        if (!err){
            console.log('Success!');
            res.status(201).json(docs);     
        }else{
            res.status(500).json({"Error": err});     
        }
    });
});

// RUTA PARA FILTRAR UNA COLLECCION
router.get('/:productId', checkAuth, (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id, (err, post) => {
        if (!err) {
            console.log(post)
            res.status(200).json(post)
        }else{
            res.status(404).json({"message": "ID no valido"})
        }
    })
});

// RUTA PARA ACTUALIZAR UNA COLLECION
router.patch('/:productId', checkAuth, (req, res, next) => {
    const id = req.params.productId;
    Product.updateOne({ _id: id}, { $set: { name: req.body.newName, price: req.body.newPrice } }, (err, docs) => {
        if (!err) {
            res.status(200).json(docs)
        } else {
            res.status(500).json({"Error": err})
        }
    });       
});

// RUTA PARA ELIMINAR UNA COLECCION
router.delete('/:productId', checkAuth, (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id}, (err) => {
        if (!err) {
            res.status(200).json({"message": "Se elimino satisfactoriamente"});
        } else {
            res.status(500).json({"Error": err});
        }
    });    
});

module.exports = router;