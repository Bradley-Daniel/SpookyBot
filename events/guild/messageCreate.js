const library = require('../../libraries/library.js')
const mongLib = require('../../libraries/mongLib.js');

require('dotenv').config();

module.exports = async (Discord, client, message) => {
	const prefix = '!';
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}
	const args = message.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();
	const command = client.commands.get(cmd);

	//runs if the message is a command in MrGhost server
	if (!command) {
		return message.reply('Sorry that is not a valid command please use `!help` to get all usable commands!');
	} else {
		let invalidPerms = library.getValidPermissions(command, message);
		if (invalidPerms.length) {
			return message.reply(`Missing Permissions, \` ${invalidPerms} \``);
		}
		try {
			if (command) {
				if(command.catagory === 'econ_command'){
					let profileData = await mongLib.getProfileData(message)
					command.execute(client, message, args, profileData);
				}else{
					command.execute(client, message, args);
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
};
