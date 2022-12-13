import { SlashCommandBuilder } from 'discord.js';
import { sendToAddress } from '../corewallet.js';

export const WithdrawCommand = new SlashCommandBuilder()
    .setName('withdraw')
    .setDescription('Withdraw funds from virtual wallet')
    .addIntegerOption(option => option.setName('amount').setDescription('Amount of SMLY to withdraw'))
    .toJSON()

export async function WithdrawInteraction(interaction, Wallets) {
    const name = interaction.user.tag;
    const amount = interaction.options.getInteger("amount");
    let wallet = '';
    try {
        wallet = await Wallets.findOne({ where: { username: Name } });
        if(wallet.balance >= amount){
            const sendSmileys = sendToAddress(wallet.withdraw_address, amount);
            try{
                const newBalance = wallet.balance - amount;
                wallet = await Wallets.update({ balance: newBalance }, { where: { username: name } });
            } catch (e) {
                console.log(e);
            }
            interaction.reply({content: `Transferred ${amount}. Your balance is now ${wallet.balance}`, ephemeral: true});
        }
        else{
            interaction.reply({content: `Not enough smileys. Your balance is ${wallet.balance}.`, ephemeral: true})
        }
    } catch (e) {
        console.log(e);
        interaction.reply({content: `Could not find a wallet with name ${Name}. Try \`/createwallet\` to create a new wallet.`, ephemeral: true});
    }
}   