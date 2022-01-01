import fs from 'fs';
import bs from 'bs58';
import {Constants, Node} from '../src';

import {
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';


console.debug(`\u001b[33m === DEBUG MODE ===`);
console.debug(`\u001b[33m solana-network: ${Constants.currentNetwork}`);

export class KeypairStr {
  pubkey: string;
  secret: string;

  constructor(
    pubkey: string,
    secret: string,
  ) {
    this.pubkey = pubkey;
    this.secret = secret;
  }

  toPublicKey(): PublicKey {
    return new PublicKey(this.pubkey);
  }

  toKeypair(): Keypair {
    const decoded = bs.decode(this.secret);
    return Keypair.fromSecretKey(decoded);
  }
}

export namespace Setup {
  const TEMP_KEYPAIR_FILE = `/tmp/solana-${Constants.currentNetwork}-keypair`;

  export const generatekeyPair = async ():
    Promise<{source: KeypairStr, dest: KeypairStr}> => {
    const {source, dest} = await fetechSourceAndDest();
    debug(source, dest);
    return {
      source: new KeypairStr(source.pubkey, source.secret),
      dest: new KeypairStr(dest.pubkey, dest.secret),
    };
  }

  const debug = (source: KeypairStr, dest: KeypairStr) => {
    console.debug(`# source.pubkey:`, source.pubkey);
    console.debug(`# source.secret: `, source.secret);
    console.debug(`# destination.pubkey:`, dest.pubkey);
    console.debug(`# destination.secret: `, dest.secret);
  }

  const fetechSourceAndDest = async () => {
    if (fs.existsSync(TEMP_KEYPAIR_FILE)) {
      return await loadTempFile();
    } else {
      return createTempFile();
    }
  }

  const loadTempFile = async () => {
    const obj = JSON.parse(fs.readFileSync(TEMP_KEYPAIR_FILE, 'utf8'));
    return {source: obj.source, dest: obj.dest};
  }

  const requestAirdrop = async (
    pubkey: PublicKey,
  ) => {
    console.debug('Now airdropping...please wait');
    const sig = await Node.getConnection().requestAirdrop(pubkey, LAMPORTS_PER_SOL);
    await Node.getConnection().confirmTransaction(sig);
    console.debug('Confirmed !!');
  }

  const createTempFile = async () => {
    const source = Keypair.generate();
    const dest = Keypair.generate();

    await requestAirdrop(source.publicKey);

    const sourceObject = new KeypairStr(
      source.publicKey.toBase58(),
      bs.encode(source.secretKey)
    );

    const destObject = new KeypairStr(
      dest.publicKey.toBase58(),
      bs.encode(dest.secretKey)
    );

    const data = templateKeyPair(sourceObject, destObject);
    fs.writeFileSync(TEMP_KEYPAIR_FILE, JSON.stringify(data));
    return data;
  }

  const templateKeyPair = (
    source: KeypairStr,
    dest: KeypairStr
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
