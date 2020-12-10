module.exports = {
	name:'ping',
	description:'ping command responds to ping by writing pong!',
	execute(msg,args){
		msg.channel.send('Pong!');
	}
};