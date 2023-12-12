var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser= require('body-parser')



var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var categoriesRoute= require('./src/routes/categories')
var productRoute= require('./src/routes/products')
var ordreRoute= require('./src/routes/Order')



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


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories',categoriesRoute);
app.use('/products',productRoute);
app.use('/order',ordreRoute);



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

