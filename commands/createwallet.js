import { SlashCommandBuilder } from 'discord.js';
import { getNewAddress } from '../corewallet.js'

export const CreateWalletCommand = new SlashCommandBuilder()
    .setName('createwallet')
    .setDescription('Create a virtual wallet')
    .toJSON()

// export function CreateWalletInteraction(interaction, Wallets) {
//     try {
//         const wallet = Wallets.create({
//             username: interaction.user.username,
//             balance: 0,
//             address: getNewAddress(),
//             withdraw_address: '',
//         })
//     }
// }