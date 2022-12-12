import { SlashCommandBuilder } from 'discord.js';

const CreateWalletCommand = new SlashCommandBuilder()
    .setName('createwallet')
    .setDescription('Create a virtual wallet')

export default CreateWalletCommand.toJSON()