This repository has the code for the SWC discord bot.
Currently it has all basic code needed to take our bot online.
**Current features** :
- Responds to ping command
- assigns roles when user reacts to roles-assign message

**Future plans** :
1. music player
2. help command
3. project picker
4. active members of project team checker
5. make announcements using bot
6. imporve on reaction roles add to make it more dyanamic

***Details*** :-
1. index.js :-
	This is the starting point of the code for our bot.
2. commands folder :-
	This folder will contain all files that will correspond to some commands that we will implement in future
	1. ping.js : repsonds to ping command by replying pong.
	2. rolesMsg.js : sends message in channel which has a list of roles and respective emojis. User should react to that message to get the role. Automatically invoked.
	3. role-claim.js: reads user reactions to rolesMsg and assigns them required role.
3. .env_sample :- 
	since we cant share token for our bot online this is a replacement for actual .env file. We need to put the value of the token in it to run the bot. Also it should have channel id of the channel where we need roles reaction add feature.
4.	.gitignore :-
	is file that has names of files that are not to be uploaded i.e .env  and node_modules
5. 	config.json :-
	It only has the prefix variable currently
6.	package.json :-
	It is the file that gets created by using the comamnd npm init and has basic details about the whole project
7.	images folder :- 
	It has logos of differnt languages to add to discord server to make them emojis and ultmately assign roles to members by reeacting to a message
	To make a custom emoji :-
	1. Server settings
	2. Emoji : upload emoji



***Steps to Use***
1. clone the repository
2. install node
3. npm install discord.js
4. add TOKEN in a file and name it .env (for reference see .env_sample)
5. add channel id of the channel where you need roles reaction feature in .env file (for reference see .env_sample) keep the channel restricted for any messages and only allow bot to message in the channel and users to react to the message
6. May have to modify role-claim.js as emojis used in it are server emojis and not universal emojis. So either change the emojis in the file or add emojis with name same as mentioned in the file to your server 
7. Enjoy editing and using the bot

***Steps to Push***
1. git clone "https://github.com/Raahil2909/SWCDiscordBot"
2. git checkout -b `${name_of_your_branch}`
3. git add . or git add `${filename_you_want_to_push}`
4. git commit -m `${changes_you_made}`
5. git push --set-upstream origin `${name_of_your_branch}`

***Some Video Resources For Discord Bot Coding***
1. https://youtube.com/playlist?list=PLaxxQQak6D_fxb9_-YsmRwxfw5PH9xALe - Worn Off Keys
2. https://youtube.com/playlist?list=PLwmVB8X2azTXOI6BDYBU98Z7vrOX7nshX - Salvage_Dev
3. https://youtube.com/playlist?list=PLdnyVeMcpY7_IiC977keSLBXXJG_I3vUo - {TheSourceCode}
4. https://youtube.com/playlist?list=PLbbLC0BLaGjpyzN1rg-gK4dUqbn8eJQq4 - CodeLyon