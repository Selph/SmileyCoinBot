import { SlashCommandBuilder } from 'discord.js';

export const TipCommand = new SlashCommandBuilder()
    .setName('tip')
    .setDescription('Send SMLY to users')
    .addIntegerOption(option => option.setName('amount').setDescription('Amount to tip'))
    .addUserOption(option => option.setName('users').setDescription('Users to tip'))
    .toJSON()

