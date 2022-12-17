import { SlashCommandBuilder } from 'discord.js';

export const HelpCommand = new SlashCommandBuilder()
    .setName('help')
    .setDescription('List commands')
    .toJSON()

export function HelpInteraction(interaction) {
    interaction.reply(
        `**List of commands**:
        \`/createwallet\` - Create a Virtual Wallet to use with bot
        \`/setaddress\`     - Set the Withdrawal Address for Virtual Wallet to enable withdrawal of funds
        \`/getaddress\`     - Get the Deposit Address for Virtual Wallet. Deposit to address to increase balance on Virtual Wallet
        \`/withdraw\`          - Withdraw funds from Virtual wWllet
        \`/balance\`            - See Balance on Virtual Wallet
        \`/tip\`                      - Send SMLY to a Discord User`
        )
}