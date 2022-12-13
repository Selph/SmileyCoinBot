// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, Routes } from 'discord.js'

import * as chokidar from 'chokidar'
import * as fs from 'fs'

import DeployCommands from './deploy-commands.js';
import { Transactions, Wallets, SQLize } from './db.js'


import { CreateWalletInteraction } from './commands/createwallet.js';
import { BalanceInteraction } from './commands/balance.js';
import { SetAddressInteraction } from './commands/setaddress.js';
import { GetAddressInteraction } from './commands/getaddress.js';
import { WithdrawInteraction } from './commands/withdraw.js';

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
    if (commandName === 'setaddress') await SetAddressInteraction(interaction, wallets)
    if (commandName === 'getaddress') await GetAddressInteraction(interaction, wallets)
    if (commandName === 'balance') await BalanceInteraction(interaction, wallets)
    if (commandName === 'tip') interaction.reply({ content: 'Todo!'})
    if (commandName === 'withdraw') await WithdrawInteraction(interaction, wallets)
  }
})

client.once(Events.ClientReady, c => {
  wallets.sync()
  transactions.sync()
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

await DeployCommands(client)

// If someone deposits onto wallet, updates balance in virtual wallett
chokidar.watch('./deposits').on('change', async (path, stats) => {
  if (path !== 'deposits/myTransactionId') {
    const transaction = JSON.parse(fs.readFileSync('./' + path, 'utf-8'))
    let addresses = []
    transaction.vout.forEach((vout) => { addresses.push(vout.scriptPubKey.addresses[0]) })
    const amount = Math.round(parseInt(transaction.vout[0].value))
    const walletarr = [] 
    for (let address of addresses) {
      walletarr.push( await wallets.findOne({ where: { address: address }}))
    }
    const wallet = await walletarr.filter(async item => await item !== null)[0]
    await wallets.update({ balance:amount }, { where: { username: await wallet.username } })
  }
});