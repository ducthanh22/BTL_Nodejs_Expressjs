var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser= require('body-parser')
const fileUpload = require('express-fileupload');
// const acl = require('express-acl');
const cors = require('cors');
// const jsonwebtoken = require('jsonwebtoken');
var jwt = require("express-jwt");

var authenticateToken = require('./src/app/repository/Middleware');



var categoriesRoute= require('./src/routes/categories')
var productRoute= require('./src/routes/products')
var orderRoute= require('./src/routes/Order')
var order_detail= require('./src/routes/order_detail')

var colorRoute= require('./src/routes/color')
var detail_exportbillRoute= require('./src/routes/detail_exportbill')
var detail_importbillRoute= require('./src/routes/detail_importbill')
var exportbill= require('./src/routes/exportbill')
var importbill= require('./src/routes/importbill')
var acount= require('./src/routes/acount')
var Produces= require('./src/routes/Produces')










var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src','views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
// app.use(authenticateToken);  
// app.use(acl.authorize);


// app.use(jwt.expressjwt({ secret: "THANH125202", algorithms: ["HS256"] }));



app.use('/categories',categoriesRoute);
app.use('/products',productRoute);
app.use('/order',orderRoute);
app.use('/order_detail',order_detail);

app.use('/color',colorRoute);
app.use('/detail_exportbill',detail_exportbillRoute);
app.use('/detail_importbill',detail_importbillRoute);
app.use('/exportbill',exportbill);
app.use('/importbill',importbill);

app.use('/produces',Produces);

app.use('/account',acount);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

