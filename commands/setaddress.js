import { SlashCommandBuilder } from 'discord.js';
import { validateAddress } from '../corewallet.js';

export const SetAddressCommand = new SlashCommandBuilder()
    .setName('setaddress')
    .setDescription('Set the address to which funds will be withdrawn')
    .addStringOption(option => option.setName('address').setDescription('Your SMLY wallet address'))
    .toJSON()

export async function SetAddressInteraction(interaction, Wallets) {
    const Name = interaction.user.tag;
    const withdraw_address = interaction.options.getString('address');
    if (withdraw_address === null) return interaction.reply({content: 'Must fill out all parameters. Try again', ephemeral: true})
    const isValidated = validateAddress(withdraw_address)
    if (!isValidated.isvalid || isValidated.isvalid === false) return interaction.reply({content: `Address ${withdraw_address} is invalid. Please enter a valid address.`, ephemeral: true})
    let wallet = '';
    try {
        wallet = await Wallets.update({ withdraw_address: withdraw_address }, { where: { username: Name } });
        interaction.reply({content: `Withdraw address was edited.`, ephemeral: true});
    } catch(e){
        console.log(e);
        interaction.reply({content: `Could not find a wallet with name ${Name}. Try /createwallet to create a new wallet.`, ephemeral: true});
    }
}     
