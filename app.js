const express  = require('express');
const https = require('https');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
  res.send('working...');
});

app.get('/webhook/',(req,res)=>{
  if (req.query['hub.verify_token'] === 'pusher-bot') {
  		res.send(req.query['hub.challenge']);
  	}
  	res.send('Wrong token!');
 });
 // Creates the endpoint for our webhook


const token = "EAAgjip2k1bUBAEl78hcTT1J5zOZChushpcG2xKyzUujDspJL0ONyD1ni7ieUpk3XQzeEO5PxAhY6dDzVrDadXkIqmI7E4kP16t5IMca75Al6nlp7YLpi5IFHpQf1cJyzEsnyNlTfhk6b8VhXZBZCSMsQIUuKqqahYMq7gyjBwZDZD";
app.post('/webhook', function(req, res) {
    var messaging_events = req.body.entry[0].messaging;
    for (var i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;
        if (event.message && event.message.text) {
            var text = event.message.text;
            sendTextMessage(sender, text + "!");
        }
    }
    res.sendStatus(200);
});
function sendTextMessage(sender, text) {
    var messageData = {
        "text": text
    };
    request({
        "url": 'https://graph.facebook.com/v2.6/me/messages',
        "qs": {
            "access_token": token
        },
        "method": 'POST',
        "json": {
            "recipient": {
                "id": sender
            },
            "message": messageData
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error:', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}
app.listen(process.env.PORT || 5000)
