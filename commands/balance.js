import { SlashCommandBuilder } from 'discord.js';

export const BalanceCommand = new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Display the balance on your virtual wallet')
    .toJSON()

export async function BalanceInteraction(interaction, Wallets) {
    let wallet = '';
    try {
        wallet = await Wallets.findOne({ where: { username: interaction.user.tag }})
        if (wallet === null) return interaction.reply({content: `You don't have a wallet. Use \`/createwallet\` `, ephemeral: true});
        interaction.reply({content: `Your balance is ${wallet.balance}`, ephemeral: true});
    } catch (error) {
        // Error username not found
        if (error.name === '') {
            interaction.reply({content: `You don't have a wallet. Use \`/createwallet\` `, ephemeral: true});
        }
    }
} 