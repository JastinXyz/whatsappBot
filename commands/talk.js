const { prefix } = require('../config.json')
const userAgents = require('../tools/user-agents.json')
const axios = require('axios')
const key = process.env.zeks
exports.run = async (client, message, args) => {
  if (!args[0]) {
    return client.reply(message.from, `Gunakan: *${prefix}talk <message>*\n\n* Tanpa < >`, message.id)
  } else try {
    const get = await axios(`https://api.zeks.xyz/api/simi?apikey=${key}&text=${message.body.slice(6)}`,{
      headers: {
        "User-Agent": userAgents[Math.floor(Math.random() * userAgents.lenght)]
      }
    })
    
    const json = get.data
    const response = json.result
    client.reply(message.from, response, message.id)
  } catch (e) {
    console.log(e)
  }
    
  
  
}

exports.help = {
  name: "Talk",
  description: "Talk with bot. Seperti Chat Bot",
  usage: `${prefix}talk <message>`,
  cooldown: 0
}
