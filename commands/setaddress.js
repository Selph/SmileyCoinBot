import { SlashCommandBuilder } from 'discord.js';

const SetAddressCommand = new SlashCommandBuilder()
    .setName('setaddress')
    .setDescription('Set the address to which funds will be withdrawn')
    .addStringOption(option => option.setName('address').setDescription('Your SMLY wallet address'))

export default SetAddressCommand.toJSON()