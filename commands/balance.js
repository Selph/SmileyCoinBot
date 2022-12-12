import { SlashCommandBuilder } from 'discord.js';

export const BalanceCommand = new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Display the balance on your virtual wallet')
    .toJSON()