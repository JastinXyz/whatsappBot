const { prefix } = require('../config.json')
const userAgents = require('../tools/user-agents.json')
const axios = require('axios')
exports.run = async (client, message, args) => {
  if (!args[0]) {
    return client.reply(message.from, `Gunakan: *${prefix}talk <message>*\n\n* Tanpa < >`, message.id)
  } else try {
    const get = await axios(`https://api.simsimi.net/v1/?text=${message.body.slice(6)}&lang=id&cf=false`,{
      headers: {
        "User-Agent": userAgents[Math.floor(Math.random() * userAgents.lenght)]
      }
    })
    
    const json = get.data
    const response = json.success
    client.reply(message.from, response, message.id)
  } catch (e) {
    console.log(e)
   client.reply(message.from, e, message.id)
  }
    
  
  
}

exports.help = {
  name: "Talk",
  description: "Talk with bot. Seperti Chat Bot",
  usage: `${prefix}talk <message>`,
  cooldown: 0
}
