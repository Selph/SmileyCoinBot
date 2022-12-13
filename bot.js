// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, Routes } from 'discord.js'
import DeployCommands from './deploy-commands.js';
import { Transactions, Wallets, SQLize } from './db.js'
import { CreateWalletInteraction } from './commands/createwallet.js';
import { CreateBalanceInteraction } from './commands/balance.js';
import { SetAddressInteraction } from './commands/setaddress.js';

const sequelize = SQLize
let wallets = Wallets(sequelize)
let transactions = Transactions(Wallets, sequelize)

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
    if (commandName === 'createwallet') wallets = await CreateWalletInteraction(interaction, wallets)
    if (commandName === 'setaddress') wallets = await SetAddressInteraction(interaction, wallets)
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