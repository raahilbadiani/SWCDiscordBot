const rolesMsg = require('./rolesMsg');
const { User } = require('discord.js');
const channelId = process.env.CHANNELID;
module.exports = client =>{
	const getemoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName);
	const emojis = {
		python	: 'python',
		cpp		: 'c++'
	};
	const reactions = [];
	let RolesReactionMessageText = 'Add a reaction to claim a role\n\n';

	for(const key in emojis){
		const emoji = getemoji(key);
		const role = emojis[key];
		RolesReactionMessageText += `${emoji} - ${role}\n`;
		reactions.push(emoji);
	}

	rolesMsg(client,channelId,RolesReactionMessageText,reactions);


	const handleReaction = (rxn,usr,add) =>{
		if(usr.bot) return;
		const emoji = rxn._emoji.name;
		const { guild } = rxn.message;
		const roleName = emojis[emoji];
		if(!roleName) return;
		const role = guild.roles.cache.find((role) => role.name === roleName);
		const member = guild.members.cache.find((member) => member.id === usr.id);
		if(add){
			member.roles.add(role);
		} else{
			member.roles.remove(role);
		}
	}


	client.on('messageReactionAdd',(rxn,usr)=>{
		if(rxn.message.channel.id === channelId){
			handleReaction(rxn,usr,true);
		}
		
	});
	client.on('messageReactionRemove',(rxn,usr)=>{
		if(rxn.message.channel.id === channelId){
			handleReaction(rxn,usr,false);
		}
		
	});

}
