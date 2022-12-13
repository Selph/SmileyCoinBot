import { SlashCommandBuilder } from 'discord.js';
import { getNewAddress } from '../corewallet.js'

export const CreateWalletCommand = new SlashCommandBuilder()
    .setName('createwallet')
    .setDescription('Create a virtual wallet')
    .toJSON()

export async function CreateWalletInteraction(interaction, Wallets) {
    let wallet = '';
    try {
         wallet = await Wallets.create({
            username: interaction.user.username,
            balance: 0,
            address: getNewAddress(),
            withdraw_address: '',
        }) 
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            interaction.user.send('Your user already exists.');
        }
    }
    interaction.reply(`Wallet for ${wallet.username} created. Check your DMs for info`);
    console.log(wallet)
    interaction.user.send(
        `Your wallet has been created. To deposit to the wallet, transfer funds from your Smiley wallet to: 
        ${wallet.address}

        When done, you might have to wait a few minutes for the funds to be deposited before you can use your wallet.

        See your balance with /balance

        To set your withdrawal address, use /setAddress <yourReceivingAddress>`);
} 