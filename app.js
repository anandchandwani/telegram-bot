const express  = require('express');
const https = require('https');
const request = require('request-promise');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
  res.send('working');
});

app.post('/webhook',(req,res)=>{
 if(req.body){
    getCurrentTime(req.body.queryResult.parameters['geo-country'],function(result){
      responseObj = {
        "fulfillmentText": "hello?",
        "fulfillmentMessages": [
      {
        "text": {
          "text": [
            "hello"
          ]
        }
      }
    ],
    "source":""

      }
     res.json(responseObj);
   });
 }
 else {
   res.json({"error":"country is missing"})
 }
 });

function getCurrentTime(country,callback){
  var options = {
    method: 'GET',
     uri: "http://api.timezonedb.com/v2.1/list-time-zone?key=120DK1H9PPDD&format=json&country="+country+"&zone=*New*",
      json: true
  }
request(options)
  .then(function (response) {   // Request was successful, use the response object at will
     callback(response);
  })
  .catch(function (err) {
    callback('not working');
    // Something bad happened, handle the error
  })
}
app.listen(process.env.PORT || 8080)
