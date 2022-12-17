# SmileyCoinBot
A Discord tipping bot for SmileyCoin

## How to set up

### Setup core wallet

- Get Ubuntu 20.04

- Set up a core smileycoin wallet, put `smileycoin-cli` and `smileycoind` into $PATH

- Append `walletnotify=/home/<yourusername>/bin/readIncoming %s` to ~/.smileycoin/smileycoin.conf

- Create a readIncoming file with these contents in ~/bin/:

```bash
#!/bin/bash
#

TxId="$1"

exists=`grep $TxId /home/<yourusername>/SmileyCoinBot/deposits/myTransactionId`

if [ X"$exists" = X ]
then
echo $1 >> /home/<yourusername>/SmileyCoinBot/deposits/myTransactionId
Tx=`smileycoin-cli getrawtransaction $TxId`
smileycoin-cli decoderawtransaction $Tx > /home/<yourusername>/SmileyCoinBot/deposits/myTransaction.$$
fi
```

- Start a server in the background with `smileycoind --server &`

### Activate bot

- Go to [Discord Developers](https://discord.com/developers/applications/)
  
  - Create an application
  
  - Note down the Client ID
  
  - Go to "Bot" and press "Reset token". Store this token inside .env as `TOKEN=<token>`
  
  - Under "Privileged Gateway Intents", toggle `Presence Intent`, `Server Members Intent` and `Message Content Intent`
  
  - Go to "OAuth2", note down the Client ID, go to -> Url Generator

    - Select `bot` and `application.commands` in the "Scope" box 
    
    - Select `Send Messages` in the "Bot Permissions" box. 
    
    - Copy the url and go to link to invite your bot to your server
    

### Setup bot

- Clone the repository to your root folder `/home/<yourusername>/`

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

- `/help` - List commands

- `/deposit` - Create a virtual wallet

- `/setaddress` - Set a withdrawal address

- `/getaddress` - Get deposit address

- `/withdraw` - Withdraw smileys from your wallet

- `/balance` - Check virtual wallet balance

- `/tip` - Send Smileys to Discord users


[A detailed explanation of commands and logic](logic-description.md)