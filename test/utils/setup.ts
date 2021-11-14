import fs from 'fs';
import {Constants, Account} from '../../src';

console.debug(`\u001b[33m === DEBUG MODE ===`);
console.debug(`\u001b[33m solana-network: ${Constants.currentNetwork}`);

export namespace Setup {
  const TEMP_KEYPAIR_FILE = `.solana-${Constants.currentNetwork}-keypair`;

  export const generatekeyPair = async ():
    Promise<{source: Account.KeypairStr, dest: Account.KeypairStr}> => {
    const {source, dest} = await getSourceAndDest();
    debug(source, dest);
    return {source: source, dest: dest};
  }

  const debug = (source: Account.KeypairStr, dest: Account.KeypairStr) => {
    console.debug(`# source.pubkey:`, source.pubkey);
    console.debug(`# source.secret: `, source.secret);
    console.debug(`# destination.pubkey:`, dest.pubkey);
    console.debug(`# destination.secret: `, dest.secret);
  }

  const getSourceAndDest = async () => {
    if (fs.existsSync(TEMP_KEYPAIR_FILE)) {
      const obj = await loadTempFile();
      const sourceBalance = await Account.getBalance(obj.source.pubkey.toPubKey());
      if (sourceBalance.isOk && sourceBalance.value < 0.1) {
        console.warn(`[Warning]source  alance is under 0.1 amount`);
        console.warn(`Reset setupKeyPair`);
        Account.requestAirdrop(obj.source.pubkey);
      }
      return obj;
    } else {
      return createTempFile();
    }
  }

  const loadTempFile = async () => {
    const obj = JSON.parse(fs.readFileSync(TEMP_KEYPAIR_FILE, 'utf8'));
    return {source: obj.source, dest: obj.dest};
  }

  const createTempFile = async () => {
    const source = Account.create();
    const dest = Account.create();
    await Account.requestAirdrop(source.pubkey.toPubKey());
    const data = templateKeyPair(source, dest);
    fs.writeFileSync(TEMP_KEYPAIR_FILE, JSON.stringify(data));
    return {source: source, dest: dest};
  }

  const templateKeyPair = (
    source: Account.KeypairStr, 
    dest: Account.KeypairStr
  ) => {
    return {
      source: {
        pubkey: source.pubkey,
        secret: source.secret,
      },
      dest: {
        pubkey: dest.pubkey,
        secret: dest.secret,
      },
    };
  }
}
