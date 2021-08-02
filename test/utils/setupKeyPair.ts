import {Keypair} from '@solana/web3.js';
import fs from 'fs';
import bs from 'bs58';
import {Account} from '../../src/account';
import debugDisp from './debugDisp';
import '../../src/util';

export namespace TestUtils {
  export const TEMP_KEYPAIR_FILE = '.solana-devnet-keypair';

  export const setupKeyPair = async ():
    Promise<{source: Keypair, dest: Keypair}> => {
    const {source, dest} = await getSourceAndDest();
    debugDisp(source, dest);
    return {source: source, dest: dest};
  }

  const getSourceAndDest = async () => {
    if (fs.existsSync(TEMP_KEYPAIR_FILE)) {
      const obj = await loadTempFile();
      const sourceBalance = await Account.getBalance(obj.source.publicKey);
      const destBalance = await Account.getBalance(obj.dest.publicKey);
      console.debug(`# source balance: ${sourceBalance}`);
      console.debug(`# dest balance: ${destBalance}`);
      if (sourceBalance < 0.1 || destBalance < 0.1) {
        console.warn(`[Warning]source or dest balance is under 0.1 amount`);
        console.warn(`Reset setupKeyPair`);
        removeTempFile;
      }
      return obj;
    } else {
      return createTempFile();
    }
  }

  const removeTempFile = () => fs.rmSync(TEMP_KEYPAIR_FILE);

  const loadTempFile = async () => {
    const obj = JSON.parse(fs.readFileSync(TEMP_KEYPAIR_FILE, 'utf8'));
    const secretSource = bs.decode(obj.source.secret);
    const secretDest = bs.decode(obj.dest.secret);
    const source = Keypair.fromSecretKey(secretSource);
    const dest = Keypair.fromSecretKey(secretDest);
    return {source: source, dest: dest};
  }

  const createTempFile = async () => {
    const source = await Account.createAccount();
    const dest = await Account.createAccount();
    const data = templateKeyPair(source, dest);
    fs.writeFileSync(TEMP_KEYPAIR_FILE, JSON.stringify(data));
    return {source: source, dest: dest};
  }

  const templateKeyPair = (source: Keypair, dest: Keypair) => {
    return {
      source: {
        pubkey: source.publicKey.toBase58(),
        secret: bs.encode(source.secretKey),
      },
      dest: {
        pubkey: dest.publicKey.toBase58(),
        secret: bs.encode(dest.secretKey),
      },
    };
  }
}

export default TestUtils.setupKeyPair;
