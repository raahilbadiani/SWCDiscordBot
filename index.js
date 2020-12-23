const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');	

const fs = require('fs');			//to read from file systems
require('dotenv').config();			//to hide bot token
const token = process.env.TOKEN;	// returns values of envrionment variables
const {prefix} = require('./config.json');//prefix variable defined in config file to determine weather msg is a command or not

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));						//read into all .js files in commands folder

client.once('ready',()=>{
	console.log('Bot is online!');
});

client.login(token);

for(const file of commandFiles){	//commandfiles has all the files which are there in the commands folder. All such files are used to implement one command each
	const command = require(`./commands/${file}`);	
	client.commands.set(command.name,command);
}

client.on('guildMemberAdd',member =>{
	member.send('Welcome to SWC disord server 😊');
});

client.on('message',msg =>{			//msg is the msg.content that we receive from user
	if(!msg.content.startsWith(prefix)||msg.author.bot) return; 
	//if msg did not start with prefix set by us or msg wee read was written by a  bot then we simply ignore it.
	
	const args = msg.content.slice(prefix.length).trim().split(/ +/); // we are using regex while splitting bcos  using ' ' simply would fail when user enters multiple consecutive spaces
	const commandName = args.shift().toLowerCase(); //this variable has first word of command ie the command name.

	 //if we dont have any file in commands folder with name or aliases as commandname then we simply return
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); // this makes a get request to the file commands/commandName.js

	if(!command)return;
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

	// if(!args.length){ // if arguments are not given after prefix commandname then we enter this if statement use it in commands/command.js file of yours if command you want to execute must have arguments. Can't use it here globally because some commands may be without arguments as well
	// 	return msg.channel.send('Not enough arguments');
	// }
	try{
	//	console.log(command);
		command.execute(msg, args, client);	//try to execute the command
	} catch(error){					// if fail to execute the command then we come here
		console.error(error);
		msg.reply(`Opps sorry can't execute the command`);
	}
	
});
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});