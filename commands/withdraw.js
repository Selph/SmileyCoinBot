import { SlashCommandBuilder } from 'discord.js';
import { sendToAddress } from '../corewallet.js';

export const WithdrawCommand = new SlashCommandBuilder()
    .setName('withdraw')
    .setDescription('Withdraw funds from virtual wallet')
    .addIntegerOption(option => option.setName('amount').setDescription('Amount of SMLY to withdraw'))
    .toJSON()

export async function WithdrawInteraction(interaction, Wallets) {
    const Name = interaction.user.tag;
    const amount = interaction.options.getString("amount");
    let wallet = '';
    try {
        wallet = await Wallets.findOne({ where: { username: Name } });
        if(wallet.balance >= amount){
            const sendSmileys = sendToAddress(wallet.withdraw_address, amount);
            try{
                const newBalance = wallet.balance - amount;
                wallet = await Wallets.update({ balance: newBalance }, { where: { username: Name } });
            } catch (e) {
                console.log(e);
            }
            interaction.reply(`Transferred ${amount}. Your balance is now ${wallet.balance}`);
        }
        else{
            interaction.reply(`Not enough smileys. Your balance is ${wallet.balance}.`)
        }
    } catch (e) {
        console.log(e);
        interaction.reply(`Could not find a wallet with name ${Name}. Try /createwallet to create a new wallet.`);
    }
}   