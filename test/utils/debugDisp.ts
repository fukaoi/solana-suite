import {Wallet} from '../../src/wallet';

export namespace TestUtils {
  console.debug(`\u001b[33m === DEBUG MODE (${process.env.NODE_ENV}) ===`);

  export const debugDisp = (source: Wallet.KeyPair, dest: Wallet.KeyPair) => {
    console.debug(`# source.pubkey:`, source.pubkey);
    console.debug(`# source.secret: `, source.secret);
    console.debug(`# dest.pubkey:`, dest.pubkey);
    console.debug(`# dest.secret: `, dest.secret);
  }
}

export default TestUtils.debugDisp;
