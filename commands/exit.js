const Discord = require("discord.js");
const { prefix } = require("../config.json");
module.exports = {
	name: "exit",
	description: `request to exit a voice channel`,
	aliases: ["e"],
	args: false,
	guildOnly: true,
	usage: `\`${prefix}exit\``,
	async execute(msg) {
		if (!msg.member.voice.channel) {
			msg.channel.send("I'm not in any voice channel!");
		}
		msg.member.voice.channel.leave();
		msg.channel.send("GoodBye! :)");
	},
};
