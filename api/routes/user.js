const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email }).then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "Error!! correo electronico ya existe"
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });
          user.save((err, docs) => {
            if (!err) {
              console.log("Success!");
              res.status(201).json({ message: "Usuario Creado.!!" });
            } else {
              res.status(500).json({ Error: err });
            }
          });
        }
      });
    }
  });
});

router.post('/login', (req, res, next) => {
  User.find({ email: req.body.email }, (err, user) => {
    if (!err) {
      if (user.length < 1) {
        return  res.status(404).json({
          message: "Auth failed !"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed !"
          });
        }
        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0]._id
          }, 'secret',
          {
            expiresIn: "1h"
          });
          return res.status(200).json({
            message: 'Auth successful !',
            token
          });
        }
        res.status(401).json({
          message: "Auth failed !"
        });
      });
    } else {
        res.status(500).json({"Error": err});
    }
  })
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.deleteOne({ _id: id}, (err) => {
        if (!err) {
            res.status(200).json({"message": "Se elimino satisfactoriamente"});
        } else {
            res.status(500).json({"Error": err});
        }
    });       
});

module.exports = router;
