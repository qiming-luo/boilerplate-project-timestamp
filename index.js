// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
//init dotenv
require('dotenv').config();

//config morgan
app.use(require('morgan')('dev'));

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// convert timestamp
function convertDate(param){
  const paramToNum = Number(param);
  let unix;
  let utc;
  if(paramToNum){
      let newdate = new Date(paramToNum);
      utc = newdate.toUTCString();
      unix = paramToNum;
  }else{
      let newdate = new Date(param);
      utc = newdate.toUTCString();
      unix = Date.parse(newdate);
  }
  
  const resObj = {
      unix,
      utc
  }

  return resObj;
}

app.get('/api/:timestamp', (req, res)=>{
  const timeParam = req.params.timestamp;
  const resultToSend = convertDate(timeParam);
  res.json(resultToSend);
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
