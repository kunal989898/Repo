/**
 * MASS KICK BOT — discord.js v14
 * USE WITH EXTREME CAUTION
 */

const {
    Client,
    GatewayIntentBits,
    PermissionsBitField,
    EmbedBuilder
} = require('discord.js');

const BOT_TOKEN = process.env.BOT_TOKEN;

const KICK_DELAY_MS = 1500;
const MAX_KICKS = 50;
const LOG_CHANNEL_ID = "";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return;

    const prefix = "!";
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command !== "purge") return;

    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return message.reply("You need Administrator permission.");
    }

    const roleName = args.shift();
    if (!roleName) return message.reply("Usage: !purge RoleName [reason]");

    const role = message.guild.roles.cache.find(
        r => r.name.toLowerCase() === roleName.toLowerCase()
    );
    if (!role) return message.reply("Role not found.");

    const reason = args.join(" ") || "Mass kick purge";

    await message.reply(
        `⚠️ WARNING: This will kick ALL members with role **${role.name}**.\nType CONFIRM within 10 seconds.`
    );

    const filter = m => m.author.id === message.author.id && m.content === "CONFIRM";
    const collector = message.channel.createMessageCollector({ filter, time: 10000, max: 1 });

    collector.on('end', async collected => {
        if (!collected.size) {
            return message.channel.send("Cancelled.");
        }

        await message.guild.members.fetch();

        let kicked = 0;

        for (const member of message.guild.members.cache.values()) {
            if (kicked >= MAX_KICKS) break;

            if (member.roles.cache.has(role.id) && member.kickable) {
                await member.kick(reason);
                kicked++;
                await new Promise(r => setTimeout(r, KICK_DELAY_MS));
            }
        }

        const embed = new EmbedBuilder()
            .setTitle("Purge Complete")
            .setDescription(`Kicked ${kicked} members with role ${role.name}`)
            .setColor("Red");

        message.channel.send({ embeds: [embed] });
    });
});

client.login(BOT_TOKEN);
