var express = require('express');
var app = express();

//----->>>> GET CLIENTS <<<---------
app.get('/clients', function (req, res) {
    res.send("CLIENT LIST REQUESTED");
});

app.listen(3001, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Proxy Server is listening on http://localhost:3001');
});

