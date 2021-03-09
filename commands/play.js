const Discord = require("discord.js");
const { prefix } = require("../config.json");
const ytdl = require("ytdl-core");
const yts = require('yt-search')

module.exports = {
    name: "play",
    description: `request to play a video`,
    aliases: ["p"],
    args: true,
    guildOnly: true,
    usage: `\`${prefix}play\``,
    async execute(msg, args) {
        let song = {
            url: args[0]
        }
        const matchYoutubeUrl = (url) => {
					var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
					if (url.match(p)) {
						return url.match(p)[1];
					}
					return false;
        }
        if (!matchYoutubeUrl(song.url)) {
            const { videos } = await yts(args.join(" "));
				if (!videos.length)
					return message.channel.send("No songs were found!");
				song = {
					title: videos[0].title,
					url: videos[0].url,
			    };
        }
        msg.member.voice.channel.join().then(connection => {
            const stream = ytdl(`${song.url}`, { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            dispatcher.on('finish', () => msg.member.voice.channel.leave());
        });
    }
}
