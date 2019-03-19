const TelegramBot = require('node-telegram-bot-api');
const token = '704268428:AAHN9vIyF0s9tIzYhkwsVwP9HLVS1tqUutU';

async function getHorrorscope() {
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
        bot.sendMessage(chatId,JSON.parse(body).description);
    });
  });
  return  getHorrorscope();
}

module.exports = {
  getHorrorscope
}
