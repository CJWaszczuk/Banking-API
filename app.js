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

db.bank_details.insert([{
	bank_name: 'Allied Irish Bank',
	atm_url_available: false,
	atm_url: 'https://api.aibgb.co.uk/open-banking/v1.2/atms'
},{
	bank_name: 'Bank of Ireland',
	atm_url_available: true,
	atm_url: 'https://openapi.bankofireland.com/open-banking/v1.2/atms'
},{
	bank_name: 'Bank of Scotland',
	atm_url_available: true,
	atm_url: 'https://api.bankofscotland.co.uk/open-banking/v1.2/atms'
},{
	bank_name: 'Barclays Bank',
	atm_url_available: true,
	atm_url: 'https://atlas.api.barclays/open-banking/v1.3/atms'
},{
	bank_name: 'Danske Bank',
	atm_url_available: true,
	atm_url: 'https://obp-api.danskebank.com/open-banking/v1.2/atms'
},{
	bank_name: 'First Trust Bank ',
	atm_url_available: true,
	atm_url: 'https://api.firsttrustbank.co.uk/open-banking/v1.2/atms'
},{
	bank_name: 'Halifax',
	atm_url_available: true,
	atm_url: 'https://api.halifax.co.uk/open-banking/v1.2/atms'
},{
	bank_name: 'HSBC Group',
	atm_url_available: true,
	atm_url: 'https://api.hsbc.com/open-banking/v1.2/atms'
},{
	bank_name: 'Lloyds Bank',
	atm_url_available: true,
	atm_url: 'https://api.lloydsbank.com/open-banking/v1.2/atms'
},{
	bank_name: 'Nationwide Building Society',
	atm_url_available: true,
	atm_url: 'https://openapi.nationwide.co.uk/open-banking/v1.2/atms'
},{
	bank_name: 'Natwest',
	atm_url_available: true,
	atm_url: 'https://openapi.natwest.com/open-banking/v1.2/atms'
},{
	bank_name: 'Royal Bank of Scotland',
	atm_url_available: true,
	atm_url: 'https://openapi.rbs.co.uk/open-banking/v1.2/atms'
},{
	bank_name: 'Santander UK',
	atm_url_available: true,
	atm_url: 'https://api.santander.co.uk/retail/open-banking/v1.2/atms'
},{
	bank_name: 'Ulster Bank',
	atm_url_available: true,
	atm_url: 'https://openapi.ulsterbank.co.uk/open-banking/v1.2/atms'
}]
)
