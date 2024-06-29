const PlayFabClient = require("playfab-sdk/Scripts/PlayFab/PlayFabClient") //playfab
const mongoose = require("mongoose") //mongoDB
const schedule = require('node-schedule'); //repeat func
const { playfabcheck } = require('./playfabcheck')
const { emoji } = require('./emoji')
const thr = require('p-throttle')

const fs = require('node:fs');
const path = require('node:path');
const { Collection, GatewayIntentBits, EmbedBuilder, Events } = require("discord.js");
const discord = require("discord.js")
const { token } = require('./config.json');
const client = new discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ]
})
client.commands = new Collection();

//============================================================================================// SLASH COMMANDS

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

client.once(Events.ClientReady, () => {
    console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

//============================================================================================// CRONJOB
const job = schedule.scheduleJob('*/3 * * * *', async function () {
    await DoLoginWithCustomID()

    const Guilds = client.guilds.cache.get("1076209332800196688")
    const channel = Guilds.channels.cache.get("1101005249977778176")

    var leadb = []

    const embed = new EmbedBuilder()
    embed.setColor([115, 7, 7])
    embed.setTitle("############   ⚔️     SA Duel Leaderboard     ⚔️   ###########")
    let flag = false
    let allrecords = await mongoose.models.idsdb.find()

    allrecords.sort(compare)
    allrecords.forEach((record, counter) => {
        flag = false
        if (counter >= 3) {
            let str = `${record.Nome}`
            leadb.push(`${emoji(record.MMR)} ${record.MMR}${"".padEnd(50, ".")} ${str}`)
            if (leadb.join('\n').length > 900) {
                embed.addFields({ name: " ", value: leadb.join('\n'), inline: false })
                leadb = []
                flag = true
            }
        }

        if (counter == 0) {
            embed.addFields({ name: `${emoji(record.MMR)} ${record.Nome} 🥇`, value: ` ${record.MMR}`, inline: true })
        }
        if (counter == 1) {
            embed.addFields({ name: `${emoji(record.MMR)} ${record.Nome} 🥈`, value: ` ${record.MMR}`, inline: true })
        }
        if (counter == 2) {
            embed.addFields({ name: `${emoji(record.MMR)} ${record.Nome} 🥉`, value: ` ${record.MMR}`, inline: true })
        }

    })

    if (!flag) embed.addFields({ name: " ", value: leadb.join('\n'), inline: false })
    embed.addFields({ name: "####################################################", value: " ", inline: false })
    embed.setFooter({ text: 'by MSAL', iconURL: 'https://cdn.discordapp.com/attachments/819537578994040852/1101039210628128788/aaaa.png' });

    const lastmessage = await channel.messages.fetch({ limit: 1 });
    lastmessage.first().delete();

    channel.send({ embeds: [embed] })
});

//============================================================================================// MONGOOSE
const { mongooseConnectionString } = require('../botrinho/config.json');

if (!mongooseConnectionString) return;

mongoose.connect(mongooseConnectionString, {
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to mongodb"));

//============================================================================================// SORT

function compare(a, b) {
    if (a.MMR < b.MMR) return 1;
    if (a.MMR > b.MMR) return -1;
    return 0;
}

client.login(token)

//============================================================================================// DELAY
