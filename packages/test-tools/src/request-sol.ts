import assert from 'assert';
import fs from 'fs';
import { SolNative } from '~/suite-sol-native';
import { Node } from '~/node';
import { Pubkey, Secret } from '~/types/account';

/**
 * This function is used in place of Airdrop.request()
 *
 * If the Airdrop.request() is called frequently,
 * the RPC server registers the ip address in the blacklist and rejects the airdrop for a while.
 */

const LOCAL_KEYPAIR_FILE = 'solana-localhost-devnet-keypair';

export const requestSol = async (pubkey: Pubkey, sol: number = 0.1) => {
  let bufferStr = '';
  try {
    bufferStr = fs.readFileSync(`./${LOCAL_KEYPAIR_FILE}`, 'utf8');
  } catch (_) {
    console.log('_');
    bufferStr = fs.readFileSync(`../../${LOCAL_KEYPAIR_FILE}`, 'utf8');
  }
  console.log('Now load...please wait');
  const keypair: { pubkey: Pubkey; secret: Secret } =
    JSON.parse(bufferStr).feePayer;
  const sig = SolNative.transfer(keypair.pubkey, pubkey, [keypair.secret], sol);

  (await sig.submit()).match(
    (ok) => {
      Node.confirmedSig(ok);
      console.log('Done transfer');
    },
    (err) => assert.fail(err),
  );
};
