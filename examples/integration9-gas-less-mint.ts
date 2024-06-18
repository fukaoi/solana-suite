//////////////////////////////////////////////
// $ npx ts-node examples/integration9-gas-less-mint.ts
//////////////////////////////////////////////

import assert from 'assert';
import { Airdrop } from '@solana-suite/airdrop';
import { requestSol } from 'test-tools';
import { RandomAsset } from 'test-tools/setupAsset';
import { RegularNft } from '@solana-suite/regular-nft';
import { Account, Result } from '@solana-suite/utils';

(async () => {
  // random create
  const owner = Account.Keypair.create();
  const feePayer = Account.Keypair.create();

  // faucet
  if (process.env.AIR_DROP) {
    await Airdrop.request(owner.pubkey);
    await Airdrop.request(feePayer.pubkey);
  } else {
    await requestSol(owner.pubkey);
    await requestSol(feePayer.pubkey);
  }

  console.log('# owner: ', owner.pubkey);
  console.log('# feePayer: ', feePayer);

  //////////////////////////////////////////////
  // CREATE HEX INSTRUCTION(Client side)
  //////////////////////////////////////////////

  const metadata = {
    name: 'solana-suite-nft',
    symbol: 'SSN',
    royalty: 10,
    description: 'solana suite nft',
    filePath: RandomAsset.get().filePath as string,
    isMutable: false,
  };

  const inst = await RegularNft.gasLessMint(
    owner.secret,
    metadata,
    feePayer.pubkey,
  );

  inst.match(
    (ok) => {
      console.log('# mint: ', ok.data);
    },
    (err) => assert.fail(err.message),
  );

  // =============================================== //
  // == SEND HEX VALUE(Client side => Sever side) == //
  // =============================================== //

  //////////////////////////////////////////////
  // SIGN FEE PAYER AND SUBMIT (Server side)
  //////////////////////////////////////////////

  // Wrap with a Result object
  const obj = Result.ok(inst.unwrap().hexInstruction);
  const res = await obj.submit({ feePayer: feePayer.secret });
  res.match(
    (ok) => console.log('# tx signature: ', ok),
    (err) => assert.fail(err.message),
  );
})();
