import { config } from 'dotenv';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js'
import PingCommand from './commands/ping.js';

async function DeployCommands(client) {
    config();

    const TOKEN = process.env.TOKEN;
    const CLIENT_ID = process.env.CLIENT_ID;

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    const commands = [
        PingCommand
    ];

    try {
        console.log('Started refreshing application (/) commands.');
        Routes.applicationGuildCommands;
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
        });
        client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
}

export default DeployCommands;