var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected');
  // we're connected!
});

var indexRouter = require('./routes/index');
var accountsRouter = require('./routes/accounts');
const { Db } = require('mongodb');

var app = express();

/* MongoDB Test Code
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, function(err, client) {
  const db = client.db('comics');
  const collection = db.collection('superheroes');

  collection.find({}).toArray((error, documents) => {
    console.log(documents);
    client.close();
  });
});*/

// Display MongoDB on page instead of in console, or in addition to
/*
app.get('/', (req, res) =>{
    MongoClient.connect(url, function (err, client) {
      if (err) throw err

      var db = client.db('comics')

      db.collection('superheroes').find().toArray(function (err, result) {
        if (err) throw err
        
        res.send(result)
      })
    })
})
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', accountsRouter);

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