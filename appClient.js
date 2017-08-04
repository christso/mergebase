var express = require('express');
var httpProxy = require('http-proxy');
var http = require('http');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(logger('dev'));

//PROXY TO API
const apiProxy = httpProxy.createProxyServer({
  target:"http://localhost:3001"
});
app.use('/api', function(req, res){
  apiProxy.web(req, res);
})
// END PROXY

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', function(req, res){
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })

app.get("/test", function(req, res) {
   res.render("test");
});

app.get("/test2", function(req, res) {
   res.render("test2");
});

app.get("/testGmap", function(req, res) {
   res.render("testGmap");
});

app.get('*', function(req, res) {
  res.render('index');
})

app.listen(3000, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Proxy Server is listening on http://localhost:3000');
});
