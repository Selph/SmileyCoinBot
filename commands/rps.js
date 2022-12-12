import{ SlashCommandBuilder } from 'discord.js'

const RPSCommand = new SlashCommandBuilder()
    .setName('RPS')
    .setDescription('Plays Rock, Paper, Scissors');

export default RPSCommand.toJSON();
