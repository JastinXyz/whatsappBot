const { prefix } = require('../config.json')
const userAgents = require('../tools/user-agents.json')
const axios = require('axios')
const key = process.env.zeks
exports.run = async (client, message) => {
try {
    const get = await axios(`https://api.zeks.xyz/api/memeindo?apikey=${key}`,{
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
