import { SlashCommandBuilder } from 'discord.js';

const BalanceCommand = new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Display the balance on your virtual wallet')

export default BalanceCommand.toJSON()