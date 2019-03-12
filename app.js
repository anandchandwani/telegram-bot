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

app.get('/', function(req, res) {
	res.status(200).json({ message: 'ok' });
})

let token = ""

// Facebook

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "blondiebytes") {
		res.send(req.query['hub.challenge'])
	}
  else {
    res.writeHead(200, {"Content-Type": "application/json"});
     res.end(JSON.stringify(someObject));
}
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			sendText(sender, "Text echo: " + text.substring(0, 100))
		}
	}
	res.sendStatus(200)
})

function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token: "EAAPyJSYGdg4BAIZAwYIK7lGmrMZANpCBKijaUw50mJoQHvevaPbXmkqOJF8nZARSK2bUGf90ZCBAMGUP17Vc1IPNBK5Igux8w5WVnMtUrhUOZCl9dO2Qr4eGQR870IZBAtxkm32zpucRgPy5iOQ8ZCpWIgkCbkwOdEL6FZAATPqy8gZDZD"},
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

app.listen(app.get('port'), function() {
	console.log("running: port")
})
