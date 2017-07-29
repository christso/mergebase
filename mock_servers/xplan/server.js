var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/xplan_mock');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

var Clients = require('./clientModel');
var seedDB = require('./seed');

seedDB();

//----->>>> GET CLIENTS <<<---------
app.get('/clients', function (req, res) {
    Clients.find(function(err, clients) {
        if (err)
            throw err;
        res.json(clients);         
    });
});

app.listen(3002, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('XPLAN Server is listening on http://localhost:3002');
});

