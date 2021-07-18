const {prefix}=require('../config.json');
const { MessageEmbed}= require('discord.js');

module.exports = {
	name: "reactionroles",
	description: `ping command responds to ping with pong and fetch time!`,
	aliases: ['test'],
	args: true,
	guildOnly:  true,
	usage: `\`${prefix}reactionrole #<channel> <List of Roles and corresponding emojis>\n Example: !reactionrole #<channel> Coder 1️⃣ Designer 2️⃣"\``,
	async execute(message, args, client) {
    const channelID=message.mentions.channels.first();
    
    //checking if the command is valid
    if(!channelID) return message.reply("Please specify a valid channel you want the embed to be sent in!\n Example: !reactionrole #<channel> Coder 1️⃣ Designer 2️⃣");
  
    const desc=args.slice(1);
    const desc2=args.slice(1).join(" ");
    if(!desc) return message.reply("Please add a valid description!\n  Example: !reactionrole #<channel> Coder 1️⃣ Designer 2️⃣")
    
    //making arrays for roles and emojis
    const findRole=(roleName)=> message.guild.roles.cache.find(role=> role.name === roleName);
    let s=desc.length;
    const roles=[];const emojis=[];
    for(let i=0;i<s;i+=2){
      let newRole=findRole(desc[i])
      if(newRole===undefined) return message.reply(`${desc[i]} is not a defined role in this server.`);
      else{
        roles.push(newRole);
        emojis.push(desc[i+1]);
      }
    }

    //sending msg on the corresponding channel and reacting with corressponding emojis
    let embed= new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("React to get a role")
      .setDescription(desc2)
  
    let msgembed= await channelID.send(embed);
    for(let i=0;i<s/2;i++){
      await msgembed.react(emojis[i]);
    }
    
    //adding a role
    client.on('messageReactionAdd', async (reaction, user)=>{
      if(reaction.message.partial) await reaction.message.fetch();
      if(reaction.partial) await reaction.fetch();
      if(user.bot) return;
      if(!reaction.message.guild) return;

      if(reaction.message.channel.id==channelID){
        for(let i=0;i<s/2;i++){
          if(reaction.emoji.name===emojis[i]){
            await reaction.message.guild.members.cache.get(user.id).roles.add(roles[i]);
          }
        }
      }else{
        return;
      }
    })

    //removing a role
    client.on('messageReactionRemove', async (reaction, user)=>{
      if(reaction.message.partial) await reaction.message.fetch();
      if(reaction.partial) await reaction.fetch();
      if(user.bot) return;
      if(!reaction.message.guild) return;

      if(reaction.message.channel.id==channelID){
        for(let i=0;i<s/2;i++){
          if(reaction.emoji.name===emojis[i]){
            await reaction.message.guild.members.cache.get(user.id).roles.remove(roles[i]);
          }
        }
      }else{
        return;
      }
    })
  }
}
