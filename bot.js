// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, Routes } from 'discord.js'
import DeployCommands from './deploy-commands.js';
import { Transactions, Wallets, SQLize } from './db.js'
import { CreateWalletInteraction } from './commands/createwallet.js';
import { CreateBalanceInteraction } from './commands/balance.js';

const sequelize = SQLize
const wallets = Wallets(sequelize)
const transactions = Transactions(Wallets, sequelize)

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ] 
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const { commandName } = interaction
    if (commandName === 'ping') interaction.reply({ content: 'Pong!'})
    if (commandName === 'createwallet') await CreateWalletInteraction(interaction, wallets)
    if (commandName === 'setaddress') interaction.reply({ content: 'Todo!'})
    if (commandName === 'balance') await CreateBalanceInteraction(interaction, wallets)
    if (commandName === 'tip') interaction.reply({ content: 'Todo!'})
    if (commandName === 'withdraw') interaction.reply({ content: 'Todo!'})
  }
})

client.once(Events.ClientReady, c => {
  wallets.sync({ force: true })
  transactions.sync()
  console.log(`Ready! Logged in as ${c.user.tag}`);
});



await DeployCommands(client)