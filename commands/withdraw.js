import { SlashCommandBuilder } from 'discord.js';

const WithdrawCommand = new SlashCommandBuilder()
    .setName('withdraw')
    .setDescription('Withdraw funds from virtual wallet')
    .addIntegerOption(option => option.setName('amount').setDescription('Amount of SMLY to withdraw'))

export default WithdrawCommand.toJSON()