import * as child from 'child_process';

export async function getNewAddress() { 
    console.log(child.execSync('smileycoin-cli getnewaddress', { encoding: 'utf-8' }))
    return await child.execSync('smileycoin-cli getnewaddress', { encoding: 'utf-8' })
}