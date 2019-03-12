'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))
// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// ROUTES


const token = "704268428:AAHN9vIyF0s9tIzYhkwsVwP9HLVS1tqUutU";
let telegram_url = "https://api.telegram.org/bot" +token+"/sendMessage";

app.post('/start_bot', function(req, res) {
	const {message} = req.body;
  let reply = 'Hi';
  sendMessage(url,message,reply,res);
  return res.end();
})

function sendMessage(url, message,reply,res) {
	let messageData = {text: text}
	request({
		url:url,
		method: "POST",
    text:reply,
		json: {
			chat_id: {id: message.chat.id},
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}
app.listen(app.get('port'), function() {
	console.log("running: port")
})
