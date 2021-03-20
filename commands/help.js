const Discord = require('discord.js');
const {prefix} = require('../config.json');

module.exports = {

    name: "help",
    description: "this is used to list all possible commands",
    aliases: [ "h","commands"],
    usage :`\`${prefix}help\``,
    guildOnly:false,
    args : false,
    execute(message, args, client){
        // message.reply(" Here are some commands to get you started, ( prefix : .. )"); 
        let data = [];
        const {commands} = message.client;

        
        if(!args.length){
           // data.push("Here is a list of all my commands! ");
           // data.push(commands.map(cmd =>cmd.name).join(', '));
          //  data.push(`To get info about a particular command use ${prefix}help <COMMAND NAME>`)
            var listOfCommands = [];
            var i = 0;
            listOfCommands.push({ name: '\u200B', value: '\u200B' });
            commands.forEach(cmd =>{
                const obj = {
                    name : `${i+1}. ` + cmd.name,
                    value : `    ${cmd.description}`,
                    inline : false,
                }
                ++i;
                //console.log(cmd.description);
               listOfCommands.push(obj)   
            });
            listOfCommands.push({ name: '\u200B', value: '\u200B' });
            
            
            //console.log(listOfCommands);

            const parentEmbed = {
							author: {
								name: "SWCBot",
								icon_url:
									"https://cdn.discordapp.com/attachments/761194181083004928/822708112615276554/IMG-20210318-WA0024.jpg",
								url: "https://discord.js.org",
							},
							color: 0x7ae5f5,
							title: "HELP",
							description: `A list of all commands!, To know about a command , use \`${prefix}help command_name\`  :)`,
							fields: listOfCommands,
							timestamp: new Date(),
							footer: {
								text: "SWCDiscordBot",
							},
						};



           

            return message.channel.send({embed : parentEmbed}).catch(error => {
				message.reply("There was an error sending you, a list of commands!", error);
				console.log(error);
            })
        }
        else{

                const commandHelpAsked = commands.find(cmd => cmd.name == args[0]||(cmd.aliases && cmd.aliases.includes(args[0])));
                if(!commandHelpAsked){
                    message.reply("No such Command found! Please check.");
                    return;
                }
                
                const childEmbed = {
									author: {
										name: "SWCBot",
										icon_url:
											"https://cdn.discordapp.com/attachments/761194181083004928/822708112615276554/IMG-20210318-WA0024.jpg",
										url: "https://discord.js.org",
									},
									color: 0x7ae5f5,
									title: `HELP  : ${commandHelpAsked.name.toUpperCase()}`,
									url: "",
									description: `Here are the details of the command ${commandHelpAsked.name}. :)`,
									fields: [
										{
											name: "\u200B",
											value: "\u200B",
										},
										{
											name: `Name :`,
											value: commandHelpAsked.name,
										},
										{
											name: `Description : `,
											value: commandHelpAsked.description,
										},
										{
											name: "Usage : ",
											value: commandHelpAsked.usage,
										},
										{
											name: "Aliases :",
											value: commandHelpAsked.aliases,
										},
										{
											name: "Arguements necessary :",
											value: commandHelpAsked.args,
										},
										{
											name: "Room only command :",
											value: commandHelpAsked.guildOnly,
										},
										{
											name: "\u200B",
											value: "\u200B",
										},
									],
									timestamp: new Date(),
									footer: {
										text: "SWCDiscordBot",
									},
								};
                data.push(`Name: ${commandHelpAsked.name} \nDescription: ${commandHelpAsked.description} \nUsage: ${commandHelpAsked.usage} \nAliases: ${commandHelpAsked.aliases} \nArguements Required: ${commandHelpAsked.args}` );
                return message.reply({embed : childEmbed}).catch(error => {
                    message.reply("Some error occured!. ")
                    console.log(error);
                })

        } 
    }

}