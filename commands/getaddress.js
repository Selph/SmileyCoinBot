import { SlashCommandBuilder } from 'discord.js';

export const GetAddressCommand = new SlashCommandBuilder()
    .setName('getaddress')
    .setDescription('Get the deposit address to deposit funds to your virtual wallet')
    .toJSON()

export async function GetAddressInteraction(interaction, Wallets) {
    let wallet = '';
    try {
        wallet = await Wallets.findOne({ where: { username: interaction.user.tag }})
        await interaction.reply({
            embeds: [{
               title: `${interaction.user.username}'s Deposit Address`,
               description: `wallet.address`,
               color: "RANDOM"
            }],
            //this is the important part
            ephemeral: true
         });
    } catch(e){
        console.log(e);
        await interaction.reply({
            embeds: [{
               title: `${interaction.user.username}'s Deposit Address`,
               description: `Could not find a wallet for user ${interaction.user.tag}. Try \`/createwallet\` to create a new wallet.`,
               color: "RANDOM"
            }],
            //this is the important part
            ephemeral: true
         });
    }
}     