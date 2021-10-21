import fs from 'fs';
import {Constants, Wallet} from '../../src';
import '../../src/util';

console.debug(`\u001b[33m === DEBUG MODE ===`);
console.debug(`\u001b[33m solana-network: ${Constants.currentNetwork}`);

export namespace Setup {
  const TEMP_KEYPAIR_FILE = `.solana-${Constants.currentNetwork}-keypair`;
  const TEMP_TOKEN_FILE = '.solana-spl-token';

  export const generatekeyPair = async ():
    Promise<{source: Wallet.KeyPair, dest: Wallet.KeyPair}> => {
    const {source, dest} = await getSourceAndDest();
    debug(source, dest);
    return {source: source, dest: dest};
  }

  const debug = (source: Wallet.KeyPair, dest: Wallet.KeyPair) => {
    console.debug(`# source.pubkey:`, source.pubkey);
    console.debug(`# source.secret: `, source.secret);
    console.debug(`# destination.pubkey:`, dest.pubkey);
    console.debug(`# destination.secret: `, dest.secret);
  }

  const getSourceAndDest = async () => {
    if (fs.existsSync(TEMP_KEYPAIR_FILE)) {
      const obj = await loadTempFile();
      const sourceBalance = await Wallet.getBalance(obj.source.pubkey.toPubKey());
      const destBalance = await Wallet.getBalance(obj.dest.pubkey.toPubKey());
      console.debug(`# source balance: ${sourceBalance}`);
      console.debug(`# destination balance: ${destBalance}`);
      if (sourceBalance.isOk && sourceBalance.value < 0.1) {
        console.warn(`[Warning]source  alance is under 0.1 amount`);
        console.warn(`Reset setupKeyPair`);
        Wallet.requestAirdrop(obj.source.pubkey);
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
    const source = await Wallet.create();
    const dest = await Wallet.create();
    await Wallet.requestAirdrop(source.pubkey.toPubKey());
    const data = templateKeyPair(source, dest);
    fs.writeFileSync(TEMP_KEYPAIR_FILE, JSON.stringify(data));
    return {source: source, dest: dest};
  }

  export const loadTokenTempFile = () => {
    let tokenKeyStr = '';
    if (fs.existsSync(TEMP_TOKEN_FILE)) {
      const res = fs.readFileSync(TEMP_TOKEN_FILE, 'utf8');
      if (res) {
        const obj = JSON.parse(res);
        tokenKeyStr = obj.tokenKey;
      }
    }
    return tokenKeyStr;
  }

  export const createTokenTempFile = async (data: Object) =>
    fs.writeFileSync(TEMP_TOKEN_FILE, JSON.stringify(data));

  const templateKeyPair = (source: Wallet.KeyPair, dest: Wallet.KeyPair) => {
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
