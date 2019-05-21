var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuarioRouter = require('./routes/usuario');
var facturaRouter = require('./routes/factura');
var destinoRouter = require('./routes/destino');
var tarjetaRegaloRouter = require('./routes/tarjetaRegalo');
var promocionRouter = require('./routes/promocion');
var productoRouter = require('./routes/producto');
var tiendaRouter = require('./routes/tienda');
var marcaRouter = require('./routes/marca');
var cuponRouter = require('./routes/cupon');
//var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
       res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
          next();
    });

app.use('/login', indexRouter);
app.use('/', indexRouter);
app.use('/usuario', usuarioRouter);
app.use('/factura', facturaRouter);
app.use('/destino', destinoRouter);
app.use('/tarjetaRegalo', tarjetaRegaloRouter);
app.use('/promocion', promocionRouter);
app.use('/producto', productoRouter);
app.use('/tiendas', tiendaRouter);
app.use('/marcas', marcaRouter);
app.use('/cupones', cuponRouter);


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
