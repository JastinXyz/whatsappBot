const { prefix, zeksApiKey } = require('../config.json')
const userAgents = require('../tools/user-agents.json')
const axios = require('axios')

exports.run = async (client, message, args) => {
  if (!args[0]) {
    return client.reply(message.from, `Gunakan: *${prefix}nulis <text>*\n\n* Tanpa < >`, message.id)
  } else try {
    
    const image = await axios(`https://api.zeks.xyz/api/nulis?apikey=${zeksApiKey}&text=${message.body.slice(7)}`,{
      headers: {
        "User-Agent": userAgents[Math.floor(Math.random() * userAgents.lenght)]
      },
      responseType: 'arraybuffer'
    })
    
    let raw = Buffer.from(image.data).toString('base64');
    
    client.sendImage(message.from, `data:${image.headers["content-type"]};base64,${raw}`, 'Awikwok', 'Yhahaha...')
  } catch (e) {
    console.log(e)
  }
    
  
  
}

exports.help = {
  name: "Nulis",
  description: "Mager nulis? pake ini aja, bakal generate tulisan di buku sesuai yang kamu tulis disini.",
  usage: `${prefix}nulis <text>`,
  cooldown: 0
}
