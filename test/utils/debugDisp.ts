import {Keypair} from '@solana/web3.js';
import bs from 'bs58';

export namespace TestUtils {
  console.debug(`\u001b[33m === DEBUG MODE ===`);

  export const debugDisp = (source: Keypair, dest: Keypair) => {
    console.debug(`# sourcePubKey:`, source.publicKey.toString());
    console.debug(`# sourceSecret: `, bs.encode(source.secretKey));
    console.debug(`# destPubKey:`, dest.publicKey.toString());
    console.debug(`# destSecret: `, bs.encode(dest.secretKey));
  }
}

export default TestUtils.debugDisp;
