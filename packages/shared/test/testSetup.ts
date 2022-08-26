import fs from 'fs';
import bs from 'bs58';
import {
  Constants, 
  Node,
  debugLog,
} from '../src';

import {
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';


console.log(`\u001b[33m === TEST START ===`);
console.log(`\u001b[33m solana-network: ${Constants.currentCluster}`);

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
  const TEMP_KEYPAIR_FILE = `/tmp/solana-${Constants.currentCluster}-keypair`;

  export const generateKeyPair = async ():
    Promise<{source: KeypairStr, dest: KeypairStr}> => {
    const {source, dest} = await fetchSourceAndDest();
    log(source, dest);
    return {
      source: new KeypairStr(source.pubkey, source.secret),
      dest: new KeypairStr(dest.pubkey, dest.secret),
    };
  }

  const log = (source: KeypairStr, dest: KeypairStr) => {
    debugLog(`# source.pubkey:`, source.pubkey);
    debugLog(`# source.secret: `, source.secret);
    debugLog(`# destination.pubkey:`, dest.pubkey);
    debugLog(`# destination.secret: `, dest.secret);
  }

  const fetchSourceAndDest = async () => {
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
    console.log('Now airdropping...please wait');
    const sig = await Node.getConnection().requestAirdrop(pubkey, LAMPORTS_PER_SOL);
    await Node.confirmedSig(sig);
    console.log('Confirmed !!');
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
