const { opts } = require("../config.json");
const prefix = opts.prefix
const { decryptMedia } = require("@open-wa/wa-decrypt");
const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

exports.run = async (client, message) => {
    const now = Date.now();
    else if ((message.isMedia || message.isGif) || (message.mimetype === "video/mp4" || message.mimetype === "image/gif") || message.type === "video") {
        if (message.duration >= 10) return client.reply(message.from, "❎ Durasi maximal 10 detik!", message.id);
        const mediaData = await decryptMedia(message, uaOverride);
        try {
            await client.sendMp4AsSticker(message.from, mediaData, {}, {
                author: message.sender.pushname,
                pack: opts.sticker-pack-name
            });
        return console.log(`[DEBUG] Sticker was generated in ${Date.now() - now}ms`);
    } catch (error) {
            return client.reply(message.from, "Error", message.id);
        } else {
        return client.reply(message.from, `❎ Pakai *${prefix}stickergif* di caption gif/mp4 atau reply gif/mp4 yang ingin di jadikan sticker gif`, message.id);
    }
}
};

exports.help = {
    name: "Sticker Gif",
    description: "Generate an custom gif sticker using picture",
    usage: `${prefix}stickergif`,
    cooldown: 3
};
