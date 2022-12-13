import { SlashCommandBuilder } from 'discord.js';

export const PingCommand = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!')
	.addStringOption((option) =>
		option
			.setName('secretoption')
			.setDescription('This option should not be seen by other users')
	)
	.toJSON();
