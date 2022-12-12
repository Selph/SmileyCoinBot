# SmileyCoinBot
A Discord tipping bot for SmileyCoin

## How to set up

- Create an application on your account on [Discord Developers](https://discord.com/developers/applications/)

- Clone the repository to your machine

-- Use `npm install` to install the dependencies
    
-- Use `npm createdb` to create the necessary postgres db

- Make a .env file with the following information:
```
CLIENT_ID=<yourclientid>
GUILD_ID=<yourguildid>
TOKEN=<yourbottoken>
//TODO postgres info
```
`CLIENT_ID` can be found on your bot page under OAUTH2

`GUILD_ID` is the server id. On Discord, go to settings -> advanced and check "Developer Mode". Now right click on your server and press "Copy Id"

`TOKEN` is your bot's token. Visit the bot page under Bot. Create the bot if necessary and click "Reset Token" to get the token.
    
    
## How to activate bot

- [Add bot to server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links). 

-- An easy way to do this is edit this link with your clientId: 

-- https://discord.com/oauth2/authorize?client_id=<CLIENT_ID_HERE>&permissions=0&scope=bot%20applications.commands

- run `node bot.js`. Bot will join the server and be up as long as the app is being run.

## Commands available


- `/deposit` - Create a virtual wallet

- `/withdraw` - Withdraw smileys from your wallet

- `/balance` - Check virtual wallet balance

- `/tip` - Send Smileys to Discord users
