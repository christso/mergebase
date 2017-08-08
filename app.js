require('babel-register')({
  "presets":["es2015", "react", "stage-2"]
});

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var requestHandler = require('./requestHandler');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(requestHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


app.listen(3000, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Proxy Server is listening on http://localhost:3000');
});
