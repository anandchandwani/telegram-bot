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
 app.post('/webhook', function(req, res) {
 	let messaging_events = req.body.entry[0].messaging
 	for (let i = 0; i < messaging_events.length; i++) {
 		let event = messaging_events[i]
 		let sender = event.sender.id
 		if (event.message && event.message.text) {
 			let text = event.message.text
 			sendText(sender, "Hello:"+text.substring(0, 100))
 		}
 	}
 	res.sendStatus(200)
 })

 function sendText(sender, text) {
 	let messageData = {text: text}
 	request({
 		url: "https://graph.facebook.com/v2.6/me/messages",
 		qs : {access_token:"EAAeQLRJqUqcBAC1HgvLDJBh5Odwcjw6etzR1eSEF0aWZBQTfLYmajtTPVxPxXwmbXMzC3JlP27ZBCEV9nWDZA7v8OupC4c05ksige49mODV5CxCfgpcAGD135BEXihUBlSgFuLGbKpf3c3kQI8UOZCIL5QHP1yhG5QzLnyQuPgZDZD"},
 		method: "POST",
 		json: {
 			recipient: {id: sender},
 			message : messageData,
 		}
 	}, function(error, response, body) {
 		if (error) {
 			console.log("sending error")
 		} else if (response.body.error) {
 			console.log("response body error")
 		}
 	})
 }

app.listen(process.env.PORT || 5000)
