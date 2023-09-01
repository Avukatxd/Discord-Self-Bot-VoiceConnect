const ayarlar = require('./ayarlar.json')
const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice')
for (let index = 0; index < ayarlar.tokens.length; index++) {
    let token = ayarlar.tokens[index]
    let oynuyor = ayarlar.oynuyor[index];
    let channel = ayarlar.channels < 1 ? ayarlar.channels[0] : ayarlar.channels[index]
    if(channel) {
        let client = new Client()
        client.login(token).catch(err => {
            console.log(`${index + 1}. Satırdaki Token Arızalı!`)
        })
        client.on('ready', async () => {
            console.log(`${client.user.tag}`)
            client.user.setPresence({ activities: [{name: oynuyor}], status: "idle", type: "PLAYING" })
            let guild = client.guilds.cache.get(ayarlar.guildID);
            if(!guild) return console.log("sunucu yok!");
            let Channel = global.Voice = guild.channels.cache.get(channel);
            if(!Channel) return console.log("channel yok");
            await joinVoiceChannel({
                channelId: Channel.id,
                guildId: Channel.guild.id,
                adapterCreator: Channel.guild.voiceAdapterCreator,
                group: client.user.id,
                selfDeaf: false,
                selfMute: false
            })
            setInterval( async () => {
                await joinVoiceChannel({
                    channelId: Channel.id,
                    guildId: Channel.guild.id,
                    adapterCreator: Channel.guild.voiceAdapterCreator,
                    group: client.user.id,
                    selfDeaf: false,
                    selfMute: false
                })
            }, 1000 * 60 * 5);
        })
    }}