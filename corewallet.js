import * as child from 'child_process';

export function getNewAddress() { 
    return child.execSync('smileycoin-cli getnewaddress', { encoding: 'utf-8' }).slice(0,-2)
}

export function sendToAddress(address, amount){
    return child.execSync(`smileycoin-cli sendtoaddress ${address} ${amount}`)
} 