import { SlashCommandBuilder } from 'discord.js';
import { getNewAddress, sendToAddress } from '../corewallet.js';

export const TipCommand = new SlashCommandBuilder()
    .setName('tip')
    .setDescription('Send SMLY to users')
    .addIntegerOption(option => option.setName('amount').setDescription('Amount to tip'))
    .addUserOption(option => option.setName('user').setDescription('User to tip'))
    .toJSON()

export async function TipInteraction(interaction, Wallets) {
    const tag = interaction.user.tag;
    const nickname = interaction.user.username
    const amount = interaction.options.getInteger("amount");
    const user = interaction.options.getUser("user");
    if (user.username === nickname) return interaction.reply({content: `You're sending to yourself! Nothing happened.`, ephemeral: true})
    if (amount === null || user === null) return interaction.reply({content: 'Must fill out all parameters. Try again', ephemeral: true})
    const username = user.username + '#' + user.discriminator
    let wallet = '';
    let receiver = '';
    wallet = await Wallets.findOne({ where: { username: tag } });
    if (wallet !== null) {
        if (wallet.balance >= amount) {
            try {
                receiver = await Wallets.findOne({ where: { username: username} });
                if (receiver === null) {
                    await Wallets.create({ 
                        username: username,
                        balance: amount,
                        address: getNewAddress(),
                        withdraw_address: '',
                    })
                    interaction.reply(`${nickname} transferred ${amount} SMLY to ${user.username}! Claim your SMLY by setting withdrawal address with \`/setaddress\` and withdrawing with \`/withdraw\`.`)
                } else {
                    const sendSmileys = sendToAddress(receiver.address, amount-1);
                    interaction.reply({content: `Transferred ${amount-1} to ${user.username}. 1 went to transaction fees. Your balance is now ${await wallet.balance - amount}`, ephemeral: true});
                } 
            } catch (e) {
                console.log(e);
            }
            try {
                const newBalance = wallet.balance - amount;
                 await wallet.update({ balance: newBalance }, { where: { username: tag } });
            } catch (e) {
                console.log(e);
            }
            
        }
        else {
            interaction.reply({content: `Not enough smileys. Your balance is ${wallet.balance}.`, ephemeral: true})
        }
    } else {
        interaction.reply({content: `Could not find a wallet with name ${tag}. Try /createwallet to create a new wallet.`, ephemeral: true});
    }
}       