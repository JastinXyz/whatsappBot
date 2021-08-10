const { prefix } = require("../config.json");
const axios = require("axios")

exports.run = (client, message) => {
  if(!message.body) client.reply(message.from, `Gunakan: *${prefix}say <message>*\n\n* Tanpa < >`, message.id)
client.reply(message.from, message.body, message.id)

};

exports.help = {
    name: "Say",
    description: "Mengikuti perkataan mu",
    usage: `${prefix}say (message)`,
    cooldown: 0
};
