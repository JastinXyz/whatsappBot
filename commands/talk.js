const { opts } = require("../config.json");
const axios = require("axios")
const userAgents = require('../tools/user-agents.json')
exports.run = (client, message) => {
if(!message.body) message.reply(message.from, `Gunakan: *${prefix}talk <message>*\n\n* Tanpa < >`, message.id)
     const get = await axios(`https://uptime-glitch-zril.glitch.me/api/simi?text=${message.body}`, {
        method: "GET",
        headers: {
        "User-Agent": userAgents[Math.floor(Math.random() * userAgents.length)]
        }
    })
    const res = get.data;
    if (!res) message.reply(message.from, 'ERR: Ada kesalahan di code\n( EMPTY JSON RESPONSE [ get.data | commands/talk.js ] )', message.id)
    const finalres = res.response
    if (!finalres) message.reply(message.from, 'ERR: Ada kesalahan di code\n( EMPTY JSON RESPONSE [ res.response | command/talk.js ] )', message.id)
message.reply(message.from, finalres, message.id)

};

exports.help = {
    name: "Talk",
    description: "Talk with bot. Seperti chat bot",
    usage: `${prefix}talk (message)`,
    cooldown: 5
};
