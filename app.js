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

      let VERIFY_TOKEN = 'pusher-bot';
      let mode = req.query['hub.mode'];
      let token = req.query['hub.verify_token'];
      let challenge = req.query['hub.challenge'];

      if (mode && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
      } else {
          res.sendStatus(403);
        }
 });
 // Creates the endpoint for our webhook


const token = "EAAeQLRJqUqcBAC1HgvLDJBh5Odwcjw6etzR1eSEF0aWZBQTfLYmajtTPVxPxXwmbXMzC3JlP27ZBCEV9nWDZA7v8OupC4c05ksige49mODV5CxCfgpcAGD135BEXihUBlSgFuLGbKpf3c3kQI8UOZCIL5QHP1yhG5QzLnyQuPgZDZD";
app.post('/webhook/', function(req, res) {
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
        text: text
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: token
        },
        method: 'POST',
        json: {
            recipient: {
                id: sender
            },
            message: messageData,
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
