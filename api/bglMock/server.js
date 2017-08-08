var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bgl_mock');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
import {port} from './serverConfig';

var Clients = require('./clientModel');
// var seedDB = require('./seeds');
// seedDB();

//----->>>> GET CLIENTS <<<---------
app.get('/clients', function (req, res) {
    Clients.find(function(err, clients) {
        if (err)
            throw err;
        res.json(clients);         
    });
});

app.listen(port, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log(`BGL Server is listening on http://localhost:${port}`);
});

