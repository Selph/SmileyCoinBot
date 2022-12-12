# SmileyCoinBot
A Discord tipping bot for SmileyCoin

## How to run

Create a bot on your account on Discord

Make a .env file with the following information:
```
TOKEN=<yourbottoken>
//TODO postgres info
```

Clone the repository to your machine

Use `npm install` to install the dependencies
    
Use `npm createdb` to create the necessary postgres db
    
run `node index.js`

Invite your bot to your server
  

## Commands available


`/deposit` - Create a virtual wallet

`/withdraw` - Withdraw smileys from your wallet

`/balance` - Check virtual wallet balance

`/tip` - Send Smileys to Discord users
