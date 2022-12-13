import { SlashCommandBuilder } from 'discord.js';

export const SetAddressCommand = new SlashCommandBuilder()
    .setName('setaddress')
    .setDescription('Set the address to which funds will be withdrawn')
    .addStringOption(option => option.setName('address').setDescription('Your SMLY wallet address'))
    .toJSON()

export async function SetAddressInteraction(interaction, Wallets) {
    const Name = interaction.user.username;
    const withdraw_address = interaction.options.getString('address');
    let wallet = '';
    try {
        wallet = await Wallets.update({ withdraw_address: withdraw_address }, { where: { name: Name } });    
    } catch(e){
        console.log(e);
    }

    if (wallet > 0) {
        return interaction.reply(`Withdraw address was edited.`);
    }

    return interaction.reply(`Could not find a wallet with name ${Name}. Try /createwallet to create a new wallet.`);
}     