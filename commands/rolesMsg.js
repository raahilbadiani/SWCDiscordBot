const addReactions = (msg,rxns) =>{
	msg.react(rxns[0]);
	rxns.shift();
	if(rxns.length>0){
		setTimeout(()=>addReactions(msg,rxns),750);
	}
}

module.exports = async (client,id,text,rxns=[]) =>{
	const channel = await client.channels.fetch(id);
	channel.messages.fetch().then((messages)=>{
		if(messages.size === 0){
			channel.send(text).then((message)=>{
				addReactions(message,rxns);
			});
		} else{
			for(const msg of messages){
				msg[1].edit(text);
				addReactions(msg[1],rxns);
			}
		}
	});
}