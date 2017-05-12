var express = require('express');
var https = require('https');
var mongoose = require('mongoose');
require('dotenv').config()

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'pug');

var options = {
  url: "https://www.youtube.com/watch?v=GRWMkUUlNuc"
}

app.get('/', function (req, res) {
  res.render('home', {
    title: 'Welcome'
  });
})

app.get('/atms', function (req,res){
  var url = 'https://api.hsbc.com/x-open-banking/v1.2/atms/geo-location/lat/51.497239/long/-0.125728?radius=1'
  https.get(url, function(res){
    var body = ''
    res.on('data', function(chunk){
        body += chunk;
    });
    res.on('end', function(){
        var fbResponse = JSON.parse(body);
        console.log(fbResponse);
    });
    }).on('error', function(e){
      console.log("Got an error: ", e);
  });
  res.locals = {
      data: "Hello"
  };
  res.render('atms', { 
    
  });
})

app.get('/mongo', function (req,res){
  var connectionString = 'mongodb://' + process.env.API_DB_URL + "/" + process.env.API_DB_COLLECTION;
  var conn = mongoose.createConnection(connectionString);
  mongoose.model('apis', {api_name: String});
  mongoose.model('apis').find(function(err,apis){
    if (err) {
      res.send(err);
    } else {
      res.send('apis');
    }
  });
})

app.listen(3002);