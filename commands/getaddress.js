import { SlashCommandBuilder } from 'discord.js';

export const GetAddressCommand = new SlashCommandBuilder()
    .setName('getaddress')
    .setDescription('Get the deposit address to deposit funds to your virtual wallet')
    .toJSON()

export async function GetAddressInteraction(interaction, Wallets) {
    let wallet = '';
    try {
        wallet = await Wallets.findOne({ where: { username: interaction.user.tag }})
        await interaction.reply({ content: `${wallet.address}`, ephemeral: true})
    } catch(e){
        console.log(e);
        interaction.reply({content:`Could not find a wallet for user ${interaction.user.tag}. Try \`/createwallet\` to create a new wallet.`, ephemeral: true });
        
    }
}     