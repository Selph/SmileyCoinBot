# SmileyCoinBot
A Discord tipping bot for SmileyCoin

## How to set up

### Activate bot

- Go to [Discord Developers](https://discord.com/developers/applications/)
  
  - Create an application
  
  - Note down the Client ID
  
  - Go to "Bot" and press "Reset token". Store this token inside .env as `TOKEN=<token>`
  
  - Under "Privileged Gateway Intents", toggle `Presence Intent`, `Server Members Intent` and `Message Content Intent`
  
  - Go to "OAuth2", note down the Client ID, go to -> Url Generator

    - Select `bot` and `application.commands` in the "Scope" box 
    
    - Select `Send Messages`, `Read Message History` and `Use Slash Commands` in the "Bot Permissions" box. 
    
    - Copy the url and go to link to invite your bot to your server

### Setup bot

- Get Ubuntu 20.04, set up a core smileycoin wallet and start a server

- Clone the repository to your root folder

  - Use `npm install` to install the dependencies
  
  - Install [nodejs](https://nodejs.org/en/)

- Make a .env file with the following information:
```xml
TOKEN=yourbottoken
CLIENTID=yourclientid
``` 
    
## How to activate bot

- run `node bot.js`. Bot will join the server and be up as long as the app is being run.

## Commands available

- `/deposit` - Create a virtual wallet

- `/withdraw` - Withdraw smileys from your wallet

- `/balance` - Check virtual wallet balance

- `/tip` - Send Smileys to Discord users
