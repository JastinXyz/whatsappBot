const { prefix, minimalMemberGc, nelfonBlock, stickerPackName, zeksApiKey, instagramSessionID} = require('./config.json')
const prefix = opts.prefix
const whatsapp = require("@open-wa/wa-automate");
const fs = require("fs");
const availableCommands = new Set();

whatsapp.create({
    blockCrashLogs: true,
    chromiumArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
    disableSpins: true,
    headless: true,
    hostNotificationLang: "id_id",
    logConsole: false,
    popup: true,
    qrTimeout: 0,
    sessionId: "JSTNXYZ",
    useChrome: true
}).then(client => start(client));



let args;
let command;

fs.readdir("./commands", (e, files) => {
    if (e) return console.error(e);
    files.forEach(commandFile => {
        availableCommands.add(commandFile.replace(".js", ""));
    });
});

function start(client) {
    client.onStateChanged(async state => {
        if (state === "CONFLICT" || state === "UNLAUNCHED") client.forceRefocus();
        console.log("[Client State]", state);
    });

// bot jika di invite ke grup
client.onAddedToGroup(((chat) => {
            let totalMem = chat.groupMetadata.participants.length
            if (totalMem < minimalMemberGc) { 
            	client.sendText(chat.id, `Member grup minimal ada ${minimalMemberGc} agar bot bisa masuk. Sedangkan member grup itu saat ini adalah ${totalMem}`).then(() => client.leaveGroup(chat.id)).then(() => client.deleteChat(chat.id))
            } else {
                client.sendText(chat.groupMetadata.id, `Halo para member grup *${chat.contact.name}*, salken member baru tapi aku bot. Kalian bisa melihat semua command memakai *${prefix}help*`)
            }
        }))

        // nelpon = block ( bisa di atur di config.json bagian nelfon-block )
       
        client.onIncomingCall(( async (call) => {
            if(nelfonBlock === true ) { 
              await client.sendText(call.peerJid, '[ BOT ] Maaf, bot tidak menerima panggilan. Nelfon = Block!')
            .then(() => client.contactBlock(call.peerJid)) 
            } else {
               console.log("Ada panggilan masuk ke bot...")
               console.log("Bot tidak akan memblokir pengguna yang menelpon karena option nelfon-block mengakatakan false.")
            }
        }))
        
    client.onMessage(async message => {
        message.restTimestamp = Date.now();

        try {
            if (message.body.startsWith(prefix)) {
                args = message.body.slice(prefix.length).trim().split(/ +/g);
                command = args.shift().toLowerCase();
                sender = message.sender.pushname;
            } else {
                return;
            }
            if (message.caption.startsWith(prefix)) {
                args = message.caption.slice(prefix.length).trim().split(/ +/g);
                command = args.shift().toLowerCase();
                sender = message.sender.pushname;
            } else {
                return;
            }
        } catch {}
        if (availableCommands.has(command)) {
            require(`./commands/${command}`).run(client, message, args);
        }
    });
}

