const Discord = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
    name: "createwebhook",
    description: `request to create a new webhook`,
    aliases: ["cwh"],
    args: true,
    guildOnly: true,
    usage: `\`${prefix}createwebhook <name>\``,
    async execute(msg, args) {

        const channelid = msg.channel.id;
		const channel = msg.guild.channels.cache.get(channelid);
        channel
					.createWebhook(`${args[0]}`, {
						avatar:
							"https://cdn.discordapp.com/attachments/761194181083004928/822708112615276554/IMG-20210318-WA0024.jpg",
					})
					.then((webhook) => {
						console.log(`Created webhook ${webhook}`);
						msg.channel.send("New webhook Created successfully! ");
					})
					.catch(console.error);
    }
};
