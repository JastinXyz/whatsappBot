const { prefix, instagramSessionID } = require("../config.json");
const ig = require('instagram-api.js')
const axios = require('axios')
const userAgents = require('../tools/user-agents.json')

exports.run = async (client, message, args) => {
      if(!args[0]) {
        return client.reply(message.from, `Gunakan: *${prefix}instagram <username>*\n\n_Contoh: ${prefix}instagram jastin_1116_`, message.id)
      } else try {
 const get = await axios(`https://api.popcatdev.repl.co/instagram?user=${message.body.slice(11)}`,{
      headers: {
        "User-Agent": userAgents[Math.floor(Math.random() * userAgents.lenght)]
      }
    })
    const json = get.data
          const userinfo = await ig.user(message.body.slice(11), instagramSessionID)

          client.sendImage(message.from, json.profile_pic, `${json.username} Profile Pict`, `- Username: ${json.username}\n- Full Name: ${json.full_name}\n\n- Biography: ${json.biography}\n\n- External URL: ${userinfo.external_url}\n- Followers: ${json.followers}\n- Following: ${json.following}\n- Category Name: ${userinfo.category_name}\n- Posts: ${json.posts} Post(s)\n- Reels: ${json.reels} Reels\n- Is Private? ${json.private}\n- Is Verified? ${json.verified}`)
      } catch(e) {
        bot.reply(message.from, 'Error', message.id)
        console.log(e)
      }
};

exports.help = {
    name: "Instagram Stalk",
    description: "Instagram User Info",
    usage: `${prefix}instagram <username>`,
    cooldown: 2
};
