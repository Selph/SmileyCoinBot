import { config } from 'dotenv';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js'
import PingCommand from './commands/ping.js';
import CreateWalletCommand from './commands/createwallet.js'
import WithdrawCommand from './commands/withdraw.js'
import TipCommand from './commands/tip.js'
import BalanceCommand from './commands/balance.js'
import SetAddressCommand from './commands/setaddress.js'

async function DeployCommands(client) {
    config();

    const TOKEN = process.env.TOKEN;
    const CLIENT_ID = process.env.CLIENT_ID;

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    const commands = [
        PingCommand,
        CreateWalletCommand,
        WithdrawCommand,
        TipCommand,
        BalanceCommand,
        SetAddressCommand
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