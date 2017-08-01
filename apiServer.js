var express = require('express');
var app = express();
var mongoose = require('mongoose');
var wfmApi = require('./api/workflowmax/clientActions')
var xplanApi = require('./api/xplan/clientActions');

mongoose.connect('mongodb://localhost:27017/practice_integrator_demo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// var seedDB = require('./seeds');
// seedDB();

var Clients = require('./models/clients.js');

//----->>>> GET CLIENTS <<<---------
app.get('/clients', function (req, res) {
    Clients.find(function(err, clients) {
        if (err)
            console.log(err);
        res.json(clients);         
    });
});

app.get('/clients/:id', function (req, res) {
    Clients.findById(req.params.id, function(err, foundClient) {
        if (err) {
            console.log(err);
        } else {
            res.json(foundClient);
        }
    });
});

// CREATE ROUTE
app.post("/clients", function(req, res) {
    console.log(req.body);
    res.send("POST SUCCESSFUL");
});

// UPDATE ROUTE
app.put("/clients/:id", function(req, res) {
    console.log(req.body);
    res.send("UPDATE SUCCESSFUL");
    // req.body.client = req.sanitize(req.body.client.body);
    // Clients.findByIdAndUpdate(req.params.id, req.body.client, function(err, updatedClient) {
    //     if (err) {
    //         res.redirect("/clients");
    //     } else {
    //         res.redirect("/clients");
    //     }
    // });
});

app.get('/clients-wfm', function (req, res) {
    wfmApi.getClients(function(apiRes, err) {
        if (err)
            console.log(err);
        res.json(apiRes); 
    });
});



app.get('/clients-xplan', function (req, res) {
    xplanApi.getClients(function(apiRes, err) {
        if (err)
            console.log(err);
        res.json(apiRes); 
    });
});

app.listen(3001, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('API Server is listening on http://localhost:3001');
});

