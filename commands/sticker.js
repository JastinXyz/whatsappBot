const { opts } = require("../config.json");
const prefix = opts.prefix
const { decryptMedia } = require("@open-wa/wa-decrypt");
const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

exports.run = async (client, message) => {
    const now = Date.now();
    if (message.isMedia && message.type === "image") {
        const media = await decryptMedia(message, uaOverride);
        await client.sendImageAsSticker(message.from, `data:image/jpeg;base64,${media.toString("base64")}`, {
            author: message.sender.pushname,
            pack: opts.sticker-pack-name
        });
        return console.log(`[DEBUG] Sticker was generated in ${Date.now() - now}ms`);
    } else if (message.quotedMsgObj && message.quotedMsgObj.type === "image") {
        const media = await decryptMedia(message.quotedMsgObj, uaOverride);
        await client.sendImageAsSticker(message.from, `data:image/jpeg;base64,${media.toString("base64")}`, {
            author: message.sender.pushname,
            pack: opts.sticker-pack-name
        });
        return console.log(`[DEBUG] Sticker was generated in ${Date.now() - now}ms`);
    } catch (error) {
            return client.reply(message.from, "Error", message.id);
        } else {
        return client.reply(message.from, `❎ Pakai *${prefix}sticker* di caption gambar atau reply gambar yang ingin di jadikan sticker`, message.id);
    }
};

exports.help = {
    name: "Sticker",
    description: "Generate an custom sticker using picture",
    usage: `${prefix}sticker`,
    cooldown: 3
};
