const { Client, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv/config');
require('./commands/rps')

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [Partials.Message, Partials.Reaction],
});

const possibilities = ['rock', 'paper', 'scissors'];

client.on('ready', () => {
	console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
	if (possibilities.includes(message.content)) {
		let comp = Math.floor(Math.random() * 3);
		let play = possibilities.indexOf(message.content);
		let win = 0;

		if ((play + 2) % 3 == comp) win = 1;
		else if (comp == play) win = 2;

		switch (win) {
			case 0:
				message.reply(
					`you play ${possibilities[play]}, i play ${possibilities[comp]}.\n we are not the same.`
				);
				break;

			case 1:
				message.reply(
					`you played ${message}, i played ${possibilities[comp]}. i never stood a chance`
				);
				break;

			case 2:
				message.reply(
					`we both played ${message}, i guess great minds think alike :)`
				);
		}
		message.reply(`comp: ${comp}`)
	}
});

client.login(process.env.TOKEN);
