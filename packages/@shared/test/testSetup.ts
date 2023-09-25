import fs from 'fs';
import bs from 'bs58';
import { Keypair, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Constants } from '../src/constants';
import { Node, debugLog, KeypairAccount, Pubkey, Secret } from '../src/';

console.log(`\u001b[33m === TEST START ===`);
console.log(`\u001b[33m solana-network: ${Constants.currentCluster}`);

export namespace Setup {
  const TEMP_KEYPAIR_FILE = `../../solana-${Constants.currentCluster}-keypair`;

  export const generateKeyPair = async (): Promise<{
    source: KeypairAccount;
    dest: KeypairAccount;
  }> => {
    const { source, dest } = await fetchSourceAndDest();
    log(source, dest);
    return {
      source: new KeypairAccount({
        pubkey: source.pubkey,
        secret: source.secret,
      }),
      dest: new KeypairAccount({ pubkey: dest.pubkey, secret: dest.secret }),
    };
  };

  const log = (source: KeypairAccount, dest: KeypairAccount) => {
    debugLog(`# source.pubkey:`, source.pubkey);
    debugLog(`# source.secret: `, source.secret);
    debugLog(`# destination.pubkey:`, dest.pubkey);
    debugLog(`# destination.secret: `, dest.secret);
  };

  const fetchSourceAndDest = async () => {
    if (fs.existsSync(TEMP_KEYPAIR_FILE)) {
      return await loadTempFile();
    } else {
      return createTempFile();
    }
  };

  const loadTempFile = async () => {
    const obj = JSON.parse(fs.readFileSync(TEMP_KEYPAIR_FILE, 'utf8'));
    return { source: obj.source, dest: obj.dest };
  };

  const requestAirdrop = async (pubkey: PublicKey) => {
    console.log('Now airdropping...please wait');
    const sig = await Node.getConnection().requestAirdrop(
      pubkey,
      LAMPORTS_PER_SOL
    );
    await Node.confirmedSig(sig);
    console.log('Confirmed !!');
  };

  const createTempFile = async () => {
    const source = Keypair.generate();
    const dest = Keypair.generate();

    await requestAirdrop(source.publicKey);

    const sourceObject = new KeypairAccount({
      pubkey: source.publicKey.toBase58() as Pubkey,
      secret: bs.encode(source.secretKey) as Secret,
    });

    const destObject = new KeypairAccount({
      pubkey: dest.publicKey.toBase58() as Pubkey,
      secret: bs.encode(dest.secretKey) as Secret,
    });

    const data = templateKeyPair(sourceObject, destObject);
    fs.writeFileSync(TEMP_KEYPAIR_FILE, JSON.stringify(data));
    return data;
  };

  const templateKeyPair = (source: KeypairAccount, dest: KeypairAccount) => {
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
  };
}
