import assert from 'assert';
import fs from 'fs';
import { Node, Pubkey, Secret, SolNative } from '@solana-suite/sol-native';

/**
 * This function is used in place of Airdrop.request()
 *
 * If the Airdrop.request() is called frequently,
 * the RPC server registers the ip address in the blacklist and rejects the airdrop for a while.
 */

const LOCAL_KEYPAIR_FILE = './solana-localhost-devnet-keypair';

export const requestTransferByKeypair = async (
  pubkey: Pubkey,
  sol: number = 0.1,
) => {
  console.log('Now load...please wait');
  const keypair: { pubkey: Pubkey; secret: Secret } = JSON.parse(
    fs.readFileSync(LOCAL_KEYPAIR_FILE, 'utf8'),
  ).source;
  const sig = SolNative.transfer(keypair.pubkey, pubkey, [keypair.secret], sol);

  (await sig.submit()).match(
    (ok) => {
      Node.confirmedSig(ok);
      console.log('Done transfer');
    },
    (err) => assert.fail(err),
  );
};
