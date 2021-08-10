const { prefix } = require("../config.json");
const { evaluate } = require("mathjs");

exports.run = async (client, message, args) => {
    const expressions = args.join(" ");
    const answer = evaluate(expressions);
    return client.reply(message.from, answer.toString(), message.id);
};

exports.help = {
    name: "Math",
    description: "Calculate something",
    usage: `${prefix}math <expression>`,
    cooldown: 5
};
