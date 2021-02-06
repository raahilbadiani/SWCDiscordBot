const Discord = require('discord.js');
const { prefix } = require("../config.json");

module.exports = {
	name: "projectadd",
	description: `to request for projects from SWC`,
	aliases: ['pa'],
	args: false,
	guildOnly:  false,
	usage: `\`${prefix}projectadd\``,
	execute(msg, args, client) {

        const exampleEmbed = new Discord.MessageEmbed()
	    .setColor('#FF0000')
    	.setTitle('PROJECTS')
	    .setURL('https://www.facebook.com/swciitg/')
	    .setAuthor('SWCBot', 'https://cutt.ly/YkcEYaG', 'https://discord.js.org')
	    .setDescription('Click on the link above to set project preference in web.')
	    // .setThumbnail('')
	    .addFields(



            { name: '\u200B', value: '\u200B' },

	    	{ name: 'Web Development - 3', value: '------------------------------' },
	    	{ name: 'Inline field title', value: 'Some value here', inline: true },
	    	{ name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },

            { name: '\u200B', value: '\u200B' },
            { name: 'Android - 3', value: '------------------------------' },
	    	{ name: 'Inline field title', value: 'Some value here', inline: true },
	    	{ name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },

            { name: '\u200B', value: '\u200B' },
            { name: 'Others - 5', value: '------------------------------' },
	    	{ name: 'Inline field title', value: 'Some value here', inline: true },
	    	{ name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },
	    )
        .setImage('https://cutt.ly/YkcEYaG')
        .setTimestamp()
	    .setFooter('Student Web Committee', 'https://cutt.ly/YkcEYaG');
		//msg.author.send(`This is your message, select your project from here`);
        msg.author.send(exampleEmbed)
            .then(msg.reply("Kindly Check your DM"));
	}
};  
