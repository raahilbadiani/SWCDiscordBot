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
		msg.member.voice.channel.leave();
		msg.channel.send("GoodBye! :)");
	},
};
