'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather
const token = 'YOUR_TOKEN_HERE';
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text =  msg.text;
  request.post({
    url:"https://aztro.sameerkumar.website/?sign="+text+"&day=today",
    }, function(error, response, body){
        if (!JSON.parse(body).message ){
             bot.sendMessage(chatId,JSON.parse(body).description);
        }
        else {
            bot.sendMessage(chatId,'This is Not a Sunshine');
          
        }
  });
});

app.listen(app.get('port'), function() {
	console.log("running: port")
})
