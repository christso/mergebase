var express = require('express');
var app = express();
var mongoose = require('mongoose');
var wfmApi = require('./api/workflowmax')

mongoose.connect('mongodb://localhost:27017/practice_integrator_demo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

var seedDB = require('./seeds');
seedDB();

var Clients = require('./models/clients.js');

//----->>>> GET CLIENTS <<<---------
app.get('/clients', function (req, res) {
    Clients.find(function(err, clients) {
        if (err)
            throw err;
        res.json(clients);         
    });
});

app.get('/clients/wfm', function (req, res) {
    wfmApi.getClients(function(apiRes, err) {
        if (err)
            throw err;
        res.json(apiRes); 
    });
});



app.listen(3001, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('API Server is listening on http://localhost:3001');
});

