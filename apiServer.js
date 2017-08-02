var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
            console.log("Error:", err);
        res.json(clients);         
    });
});

app.get('/clients/:id', function (req, res) {
    console.log("REQ BODY: ", req.body);
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
    console.log("REQ BODY: ", req.body);
    Clients.create(req.body, function(err, newClient) {
        if (err) {
            res.send("ERROR CREATING CLIENT");
        } else {
            res.json(newClient);
        }
    });
});

// UPDATE ROUTE
app.put("/clients/:id", function(req, res) {
    console.log("REQ BODY: ", req.body);
    Clients.findByIdAndUpdate(req.params.id, req.body, function(err, updatedClient) {
        if (err) {
            res.send("# API UPDATE CLIENT:\n" + JSON.stringify(err));
        } else {
            res.json(updatedClient);
        }
    });
});

app.delete("/clients/:id", function(req, res) {
    var query = { _id: req.params.id };
    Clients.remove(query, function(err, deletedClient) {
        if (err) {
            res.send("# API DELETE CLIENT:\n" + JSON.stringify(err));
        } else {
            res.send(deletedClient);
        }
    });
})

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

