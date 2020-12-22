const { prefix } = require("../config.json");
module.exports = {
	name: "ping",
	description: `ping command responds to ping with pong and fetch time!`,
	aliases: ['test'],
	args: false,
	guildOnly:  false,
	usage: `\`${prefix}ping\``,
	execute(msg, args, client) {
		msg.channel
			.send(`Pong! (${ Math.round(client.ws.ping)}ms)` );
	},
};
