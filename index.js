const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const fs = require('fs');			
require('dotenv').config();			
const token = process.env.TOKEN;	
const {prefix} = require('./config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));				

client.once('ready',()=>{
	console.log('Bot is online!');
});

client.login(token);

for(const file of commandFiles){	
	const command = require(`./commands/${file}`);	
	client.commands.set(command.name,command);
}

client.on('guildMemberAdd',member =>{
	member.send('Welcome to SWC disord server 😊');
});

client.on('message',msg =>{			//msg is the msg.content that we receive from user
	if(!msg.content.startsWith(prefix)||msg.author.bot) return; 
	
	const args = msg.content.slice(prefix.length).trim().split(/ +/); 
	const commandName = args.shift().toLowerCase(); 
	
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); 
	
	if(!command){
		return;
	}

	if(command.guildOnly && msg.channel.type == 'dm'){
		return msg.reply("This command can only be used in Guilds.")
	}

	if(command.args && !args.length){
		
		let reply = "Please provide arguments!"
		if(command.usage){
			reply += `, Proper use: ${command.usage}`
		}
		return msg.reply(reply);
	}

	try{
		command.execute(msg, args, client);		
		
	} 
	catch(error){					
		console.error(error);
		msg.reply(`Oops sorry can't execute the command`);
	}
	
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});