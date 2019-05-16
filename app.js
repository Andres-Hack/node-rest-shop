const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const productRouter = require('./api/routes/products');
const orderRouter = require('./api/routes/orders');
const userRouter = require('./api/routes/user');

mongoose.connect('mongodb://localhost/'+process.env.MONGO_ATLAS_PW, {useNewUrlParser: true});

app.use(morgan('combined'));
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/user', userRouter);

module.exports = app;

