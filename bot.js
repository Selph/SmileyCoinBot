// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, Routes } from 'discord.js'
import DeployCommands from './deploy-commands.js';
import { Sequelize } from 'sequelize'

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ] 
});

client.on('interactionCreate', (interaction) => {
  if (interaction.isChatInputCommand()) {
    const { commandName } = interaction
  }
})

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

await DeployCommands(client)