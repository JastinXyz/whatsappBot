const { prefix } = require("../config.json");

exports.run = (client, message) => {
    client.reply(message.from, `REST Latency: ${Date.now() - message.restTimestamp}ms`, message.id);
};

exports.help = {
    name: "Ping",
    description: "PONG!",
    usage: `${prefix}ping`,
    cooldown: 5
};
