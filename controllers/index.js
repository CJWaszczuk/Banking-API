var express = require('express');
var request = require('request');

var app = express();

app.set('views', './views');

var options = {
  url: "https://www.youtube.com/watch?v=GRWMkUUlNuc"
}

app.get('/', function (req, res) {
  res.send('Front Page!');
})