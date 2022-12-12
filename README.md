# SmileyCoinBot
A Discord tipping bot for SmileyCoin

## How to run

Create a bot on your account on [Discord Developers](https://discord.com/developers/applications/]

Make a .env file with the following information:
```
CLIENT_ID=<yourclientid>
GUILD_ID=<yourguildid>
TOKEN=<yourbottoken>
//TODO postgres info
```
`CLIENT_ID` can be found on your bot page under OAUTH2

`GUILD_ID` is the server id. On Discord, go to settings -> advanced and check "Developer Mode". Now right click on your server and press "Copy Id"

`TOKEN`is your bots token. Visit the bot page under Bot. Create the bot if necessary and click "Reset Token" to get the token.

Clone the repository to your machine

Use `npm install` to install the dependencies
    
Use `npm createdb` to create the necessary postgres db
    
run `node bot.js`

Invite your bot to your server
  

## Commands available


`/deposit` - Create a virtual wallet

`/withdraw` - Withdraw smileys from your wallet

`/balance` - Check virtual wallet balance

`/tip` - Send Smileys to Discord users
