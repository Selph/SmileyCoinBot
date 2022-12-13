import { SlashCommandBuilder } from 'discord.js';
import { isNull } from 'util';
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
    
    wallet = await Wallets.findOne({ where: { username: name } });
    if (!wallet) return interaction.reply({content: `Could not find a wallet with name ${name}. Try \`/createwallet\` to create a new wallet.`, ephemeral: true});
    if(wallet.balance >= amount){
        if (wallet.withdraw_address === '') return interaction.reply({content: 'You have to set your withdraw address to withdraw funds. Use \`/setaddress\`'})
        const transaction = sendToAddress(wallet.withdraw_address, amount-1);
        try{
            const newBalance = wallet.balance - amount;
            wallet = await wallet.update({ balance: newBalance }, { where: { username: name } });
        } catch (e) {
            console.log(e);
        }
        interaction.reply({content: `Withdrew ${amount-1} to your wallet. 1 went to transaction fees. Your balance is now ${await wallet.balance}`, ephemeral: true});
    }
    else{
        interaction.reply({content: `Not enough smileys. Your balance is ${await wallet.balance}.`, ephemeral: true})
    }
    
}   