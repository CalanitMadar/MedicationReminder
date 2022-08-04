var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registrationRouter = require('./routes/registration');
var logInUserRouter = require('./routes/logInUser');
var myDrugsRouter = require('./routes/myDrugs');
var contactsRouter = require('./routes/contacts');
var newDrugRouter = require('./routes/newDrug');
var lockingSiteRouter = require('./routes/lockingSite');
var reportRouter = require('./routes/report');
var stockMedicationRouter = require('./routes/stockMedication');
var messageRouter = require('./routes/message');
var SMSRouter = require('./routes/SMS');
var imageDrugRouter = require('./routes/imageDrug');
var myDetailsRouter = require('./routes/myDetails');
var checkDatabaseRouter = require('./routes/database');





var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname+'/public')));

app.use(session({
  secret:"somesecretkey",
  resave: false, // Force save of session for each request
  saveUninitialized: false, // Save a session that is new, but has not been modified
  cookie: {maxAge: 1800000 }
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', registrationRouter);
app.use('/', logInUserRouter);
app.use('/', myDrugsRouter);
app.use('/', contactsRouter);
app.use('/', newDrugRouter);
app.use('/', lockingSiteRouter);
app.use('/', reportRouter);
app.use('/', stockMedicationRouter);
app.use('/', messageRouter);
app.use('/', SMSRouter);
app.use('/', imageDrugRouter);
app.use('/', myDetailsRouter);
app.use('/', checkDatabaseRouter);






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
