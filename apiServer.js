var express = require('express');
var app = express();
var wfmApi = require('./api/workflowmax')

//----->>>> GET CLIENTS <<<---------
app.get('/clients', function (req, res) {
    wfmApi.getClients(function(apiRes) {
        res.send(apiRes); 
    });
});



app.listen(3001, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('API Server is listening on http://localhost:3001');
});

