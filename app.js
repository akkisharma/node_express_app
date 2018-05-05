var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/product')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var sessionRouter = require('./routes/sessions');
var usersRouter = require('./routes/users');
var consultantsRouter = require('./routes/consultants');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);
app.use('/', sessionRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);
app.use('/consultants', consultantsRouter);
app.use(session({
	secret: 'yeuidhjksydhskhu',
	saveUninitialized: true,
	resave: false,
	cookie: { secure: true }
}));


app.get('/logout', function(req, res){
  req.session.destroy(function(){
    res.json({message: 'user logged out.'});
  });
});

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
