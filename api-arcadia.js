var express = require('express');
var request = require('request');
var app = express();

var os = require("os");
const { response, text } = require('express');
const { stringify } = require('querystring');
//os.hostname();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/feature', function (req, res) {
  // res.send('Hello World');
  res.sendfile('feature.html');
});

app.get('/api/v2/getAccountdetail', function (req, res) {
  // res.send('Hello World');
  res.sendfile('feature.html');
});

app.get('/api/v2/getHolding', function (req, res) {
  // res.send('Hello World');
  res.sendfile('feature.html');
});

app.get('/api/v2/getUserProfile', function (req, res) {
  // res.send('Hello World');
  res.sendfile('feature.html');
});


app.get('/api/v2/getAccountBalance', function (req, res) {
  // res.send('Hello World');
  res.sendfile('feature.html');
});

app.post('/insertAccountinfo', function (req, res) {
  // res.send('Hello World');
  res.sendfile('feature.html');
});

app.post('/api/placeOrder', function (req, res) {
  // res.send('Hello World');
  res.sendfile('feature.html');
});

app.post('/api/subscribe', function (req, res) {
  // res.send('Hello World');
  res.sendfile('feature.html');
});

app.post('/api/moveOrder', function (req, res) {
  // res.send('Hello World');
  res.sendfile('feature.html');
});

app.post('/api/chat', function (req, res) {
  // res.send('Hello World');
  res.sendfile('feature.html');
});

app.post('/api/chat-langchain', function (req, res) {
  // res.send('Hello World');
  res.sendfile('feature.html');
});


global.sec = "";

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  
    remote_ip = req.connection.remoteAddress;
    if (remote_ip.substr(0, 7) == "::ffff:") {
      remote_ip = remote_ip.substr(7)
    }
    
    local_ip = req.connection.localAddress;
    if (local_ip.substr(0, 7) == "::ffff:") {
      local_ip = local_ip.substr(7)
    }

  res.render('index', {
    title: 'Blindfold App',
    hostname: 'APP POD HOSTNAME : ' + os.hostname(),
    host_header: 'HOST HEADER:  ' + req.header('host'),
    user_agent: 'USER AGENT:  ' + req.header('user-agent'),
    remote_address: 'REMOTE ADDRESS:  ' + remote_ip + "  :  " + req.connection.remotePort,
    local_address: 'LOCAL ADDRESS:  ' + local_ip + " : " + req.connection.localPort,
    x_forwarded_for: 'X-FORWARDED-FOR:  ' +  req.headers['x-forwarded-for']
    
  });
  //console.log(req.headers);
});

app.post('/', function(req, res){


 var str = '';
 //const obj = require('./input.json');
 const fs = require('fs');
 let rawdata = fs.readFileSync('./input.json');
 const obj = JSON.parse(rawdata);

 output = request.post({
   url: 'http://localhost:8070/secret/unseal',
   url2: 'https://backend.app.trust.ai/api/v2/getAccountdetail',
   url3: 'https://backend.app.trust.ai/api/v2/getHolding',
   url4: 'https://backend.app.trust.ai/api/v2/getUserProfile',
   url5: 'https://backend.app.trust.ai/api/v2/getAccountBalance',
   url6: 'https://backend.app.trust.ai/insertAccountinfo',
   url7: 'https://backend.app.trust.ai/api/placeOrder',
   url8: 'https://backend.app.trust.ai/api/subscribe',
   url9: 'https://backend.app.trust.ai/api/moveOrder',

   body: obj,
   headers: {'content-type' : 'application/json'},
   json: true
 }, function(error, response, response_body){
    str = "" + response_body;

    let substr1 = 'INITIALIZING'
    if (str.includes(substr1)) {
      console.log('string=' + str)
    } else {
      let buff = Buffer.from(str, 'base64');
      sec = buff.toString('utf-8');
      console.log(sec);
    }

 });

 res.render('index', {
  title: '',
  hostname: 'APP POD HOSTNAME : ' + os.hostname(),
  host_header: 'HOST HEADER:  ' + req.header('host'),
  user_agent: 'USER AGENT:  ' + req.header('user-agent'),
  remote_address: 'REMOTE ADDRESS:  ' + remote_ip + "  :  " + req.connection.remotePort,
  local_address: 'LOCAL ADDRESS:  ' + local_ip + " : " + req.connection.localPort,
  x_forwarded_for: 'X-FORWARDED-FOR:  ' +  req.headers['x-forwarded-for'],
  
  secret: 'API Key Secret [C] ===> ' + '"' + sec + '"'

});


});

const port = process.env.PORT || 8080;
   app.listen(port, () => {
     console.log("Listening on port", port);
   });
