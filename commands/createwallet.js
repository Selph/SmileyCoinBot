import { SlashCommandBuilder } from 'discord.js';
import { getNewAddress } from '../corewallet.js'

export const CreateWalletCommand = new SlashCommandBuilder()
    .setName('createwallet')
    .setDescription('Create a virtual wallet')
    .toJSON()

export async function CreateWalletInteraction(interaction, Wallets) {
    let wallet = '';
    try {
        // Create row in db
        wallet = await Wallets.create({ 
            username: interaction.user.tag,
            balance: 0,
            address: getNewAddress(),
            withdraw_address: '',
        }) 
        interaction.reply({content:`Wallet for ${wallet.username} created. Check your DMs for info`, ephemeral: true});
        interaction.reply({content:
            `**Your wallet has been created**. 
To deposit to the wallet, transfer funds from your Smiley wallet to: 
\`${await wallet.address}\`

When done, you might have to wait a few minutes for the funds to be deposited before you can use your wallet.

    > See your **balance** with \`/balance\`
    > To set your **withdrawal address**, use \`/setAddress <yourReceivingAddress>\``, ephemeral:true});
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            interaction.reply({content: 'Your user already exists.', ephemeral: true});
        }
    }
} 