var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/xplan-mock');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

app.listen(3002, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('XPLAN Server is listening on http://localhost:3002');
});

