import * as child from 'child_process';

export function getNewAddress() { 
    return child.execSync('smileycoin-cli getnewaddress', { encoding: 'utf-8' })
}