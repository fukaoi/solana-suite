//////////////////////////////////////////////
// $ npx ts-node examples/integration7-transfer-to-users
//////////////////////////////////////////////

import assert from 'assert';
import { KeypairStr, Airdrop, Pubkey, SplToken } from '@solana-suite/core';

import {
  Node,
  // Constants,
  sleep,
} from '@solana-suite/shared';

const USERS_COUNT = 50;
const SLEEP_TIME_WAIT = 0;

(async () => {
  // Node.changeConnection({
  // cluster: Constants.Cluster.prd,
  // commitment: 'finalized'
  // });

  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  let users = [];
  for (let i = 0; i < USERS_COUNT; i++) {
    users.push(KeypairStr.create());
  }

  // manual setting
  // const owner = new KeypairStr(
  // '',
  // ''
  // );

  // random create
  const owner = KeypairStr.create();
  await Airdrop.request(owner.toPublicKey());
  console.log('# owner: ', owner.pubkey);

  //////////////////////////////////////////////
  // CREATE TOKEN
  //////////////////////////////////////////////

  const totalAmount = 100000;
  const decimals = 1;
  const inst1 = await SplToken.mint(
    owner.toPublicKey(),
    [owner.toKeypair()],
    totalAmount,
    decimals
  );

  // submit instructions
  (await inst1.submit()).match(
    (value) => console.log('# mint nft sig: ', value),
    (error) => assert.fail(error)
  );

  const mint = inst1.unwrap().data as Pubkey;
  console.log('# mint: ', mint);

  //////////////////////////////////////////////
  // TRANSFER RECEIPT USER FROM THIS LINE
  //////////////////////////////////////////////

  let i = 1;
  for (const user of users) {
    await sleep(SLEEP_TIME_WAIT);
    const inst2 = await SplToken.transfer(
      mint.toPublicKey(),
      owner.toPublicKey(),
      user.toPublicKey(),
      [owner.toKeypair()],
      10,
      decimals
    );

    (await inst2.submit()).match(
      (value) => {
        console.log('# Transfer nft sig: ', value);
        console.log('# count: ', i);
        i++;
      },
      (error) => {
        assert.fail(error);
      }
    );
  }
})();
