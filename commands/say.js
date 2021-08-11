const { prefix } = require("../config.json");
const axios = require("axios")

exports.run = (client, message, args) => {
  if(!args[0]) { client.reply(message.from, `Gunakan: *${prefix}say <message>*\n\n* Tanpa < >`, message.id) 
  } else {
client.reply(message.from, message.body.slice(5), message.id)
}
};

exports.help = {
    name: "Say",
    description: "Mengikuti perkataan mu",
    usage: `${prefix}say <message>`,
    cooldown: 0
};
