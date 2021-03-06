const fs = require('fs');

module.exports = (client, Discord) => {
	const command_files = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));
	const econ_command_files = fs.readdirSync('./commands/econ_commands').filter((file) => file.endsWith('.js'));


	for (const file of command_files) {
		const command = require(`../commands/${file}`);
		//console.log(command.name);
		if (command.name) {
			client.commands.set(command.name, command);
		} else continue;
	}
	for(const file of econ_command_files){
		const econ_command = require(`../commands/econ_commands/${file}`);
		if(econ_command.name){
			client.commands.set(econ_command.name, econ_command);
		}else continue;
	}
};
