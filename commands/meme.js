const { prefix, zeksApiKey } = require('../config.json')
const userAgents = require('../tools/user-agents.json')
const axios = require('axios')

exports.run = async (client, message) => {
try {
    const get = await axios(`https://api.zeks.xyz/api/memeindo?apikey=${zeksApiKey}`,{
      headers: {
        "User-Agent": userAgents[Math.floor(Math.random() * userAgents.lenght)]
      }
    })
    
    const json = get.data
    const response = json.result
    client.sendImage(message.from, response, `Ini Meme`, response)
  } catch (e) {
    console.log(e)
  }
    
  
  
}

exports.help = {
  name: "Meme",
  description: "Random meme indo",
  usage: `${prefix}meme`,
  cooldown: 5
}
