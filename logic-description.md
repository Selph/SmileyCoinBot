# User deposits 

Users can deposit to their SmileyCoinBot balance from personal Smiley Coin wallets by sending to the address given by the bot when the /createwallet or /getaddress command is used. 

The SmileyCoinBot watches all incoming transactions to the core wallet and if a transaction is sent to an address belonging to a user the SmileyCoinBot will increase the users balance by the received amount.

# Commands

## `/help`

### Description

List commands

### Logic

Bot sends a reply visible to other users listing all commands

## `/createwallet`

### Description

Create a virtual wallet

### Logic

Bot checks if the User's wallet exists in the database

- #### Wallet exists
	- Bot sends ephemeral reply to user: `Your user already exists.`
- #### User doesn't exist  
	- Bot creates a new user in database and creates new address for user by using the "getnewaddress" command in the smiley core wallet. 
	- User can deposit smiley coins to address attached to his discord username in database. 

## `/balance`

### Description

Display the balance on your virtual wallet

### Logic

Bot checks if the user's wallet exists in the database

- #### User exists

	- Bot sends ephemeral reply: `Your balance is ${wallet.balance}`

- #### User doesn't exist

	- Bot sends ephemeral reply: `You don't have a wallet. Use /createwallet`


## `/getaddress`

### Description

Get the deposit address to deposit funds to your virtual wallet

### Logic

Bot checks if the user's wallet exists in the database

- #### User exists

	- Bot sends an ephemeral reply: `${wallet.address}`

- #### User doesn't exist

	- Bot sends an ephemeral reply: ``Could not find a wallet for user ${interaction.user.tag}. Try `/createwallet` to create a new wallet.``

## `/setaddress`

### Description

Set the address to which funds will be withdrawn

### Parameters

`address` - Your SMLY wallet address

### Logic

Bot checks if the parameters are empty

- #### Parameters are empty

	- Bot sends an ephemeral reply: `Must fill out all parameters. Try again`

- #### Parameters are not empty

	- Bot checks if the address is valid by query-ing the core wallet, using `/smileycoin-cli validateaddress <address>`

	- ##### Address is not valid

		- Bot sends an ephemeral reply: `Address ${withdraw_address} is invalid. Please enter a valid address.`

	- ##### Address is valid

		- Bot checks if the User's wallet exists in the database

		- ###### Wallet doesn't exist

			- Bot sends an ephemeral reply: `Could not find a wallet with name ${Name}. Try /createwallet to create a new wallet.`
		
		- ###### Wallet exists
			- Bot updates the address for the User's virtual wallet in the database with the given address parameter
			- Bot sends an ephemeral reply: `Withdraw address was edited.`


## `\tip`

### Description

Send SMLY to users

### Parameters

`amount` - Amount to tip
`user` - User to tip

### Logic

#### Guard conditions

- ##### User tries to send to himself

	- Bot sends an ephemeral reply: `You're sending to yourself! Nothing happened.`

- ##### Parameters are empty

	- Bot sends an ephemeral reply: `Must fill out all parameters. Try again`

- ##### User doesn't have a wallet

	- Bot sends an ephemeral reply: `Could not find a wallet with name ${tag}. Try /createwallet to create a new wallet.`

#### Wallet exists

Bot checks if wallet has enough balance to tip the amount

- ##### Balance is lower than amount
	- Bot send an ephemeral reply: `Not enough smileys. Your balance is ${wallet.balance}.`

- ##### Balance is higher than amount
	- Bot checks if receiver has a wallet
		- ###### Receiver doesn't have a wallet
			- Bot creates a wallet for the receiver
			- Bot send a visible reply: `${nickname} transferred ${amount} SMLY to ${user.username}! Claim your SMLY by setting withdrawal address with /setaddress and withdrawing with /withdraw.`
		- ###### Receiver has a wallet
			- Bot sends an ephemeral reply: `Transferred ${amount-1} to ${user.username}. 1 went to transaction fees. Your balance is now ${await wallet.balance  -  amount}`
			
		- Bot transfers amount from user's wallet to receiver's wallet

## `/withdraw`  

### Description

Withdraw funds from virtual wallet  

### Parameters

`Amount` - Amount of SMLY to withdraw

### Logic

Bot checks if User's wallet exists in database

- #### Wallet doesn't exist 
  - Bot sends ephemeral message to user: `Could not find a wallet with name <User using /withdraw discord name>. Try /createwallet to create a new wallet.`

- #### Wallet Already exists

	Bot checks if wallet has a withdrawal address

	- ##### Wallet does not have a withdrawal address
	
		- Bot sends ephemeral reply to user: `You have to set your withdraw address to withdraw funds. Use /setaddress`
	- ##### Wallet has a withdrawal address
		Bot compares the amount with the wallet's balance
		- #### Amount is less than or equal to users coin balance  
			- Bot contacts core wallet to send SMLY to the User's withdraw address equal to amount requested by user. 
			- Bot sends ephemeral reply to user: `Withdrew <amount - 1> to your wallet. 1 went to transaction fees. Your balance is now <user balance - amount>`  
		- #### Amount is greater than users coin balance  
			- Bot sends ephemeral message to user: `Not enough smileys. Your balance is <Users current balance>.`  
