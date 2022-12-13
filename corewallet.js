import * as child from 'child_process';

export async function getNewAddress() { 
    return await child.execSync('smileycoin-cli getnewaddress', { encoding: 'utf-8' })
}