import { SlashCommandBuilder } from 'discord.js';

const PingCommand = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')

export default PingCommand.toJSON()