import { SolNative } from '@solana-suite/core';
import { Node } from '@solana-suite/shared/src';
import { PublicKey } from '@solana/web3.js';
import assert from 'assert';
import fs from 'fs';

/**
 * This function is used in place of Airdrop.request()
 *
 * If the Airdrop.request() is called frequently,
 * the RPC server registers the ip address in the blacklist and rejects the airdrop for a while.
 *
 */

const LOCAL_KEYPAIR_FILE = './solana-localhost-devnet-keypair';

export const requestTransferByKeypair = async (
  pubkey: PublicKey,
  sol: number = 0.1
) => {
  console.log('Now transfer...please wait');
  const keypair: { pubkey: string; secret: string } = JSON.parse(
    fs.readFileSync(LOCAL_KEYPAIR_FILE, 'utf8')
  ).source;
  const sig = SolNative.transfer(
    keypair.pubkey.toPublicKey(),
    pubkey,
    [keypair.secret.toKeypair()],
    sol
  );

  (await sig.submit()).match(
    (ok) => {
      Node.confirmedSig(ok);
      console.log('Done transfer');
    },
    (err) => assert.fail(err)
  );
};
