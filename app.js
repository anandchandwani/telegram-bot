'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const appss = express()

appss.set('port', (process.env.PORT || 5000))
// Allows us to process the data
appss.use(bodyParser.urlencoded({extended: false}))
appss.use(bodyParser.json())
// ROUTES


const token = "704268428:AAHN9vIyF0s9tIzYhkwsVwP9HLVS1tqUutU";
let telegram_url = "https://api.telegram.org/bot" +token+"/sendMessage";
var TelegramBot = require('node-telegram-bot-api');

appss.post('/start_bot', function(req, res) {
  telegram.on("text", (message) => {
    telegram.sendMessage(message.chat.id, "Hello");
  });
})


appss.listen(appss.get('port'), function() {
	console.log("running: port")
})
