import * as child from 'child_process';

export function getNewAddress() { 
    return child.execSync('smileycoin-cli getnewaddress', { encoding: 'utf-8' }).replace(/(\r\n|\n|\r)/gm, "");
}

export function sendToAddress(address, amount){
    return child.execSync(`smileycoin-cli sendtoaddress ${address} ${amount}`)
} 

export function validateAddress(address){
    return child.execSync(`smileycoin-cli validateaddress ${address}`).toJSON()
} 