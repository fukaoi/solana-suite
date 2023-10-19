//////////////////////////////////////////////
// $ npx ts-node examples/integration9-feepayer-partial-sign-nft-mint.ts
//////////////////////////////////////////////

import assert from 'assert';
import { Airdrop } from '@solana-suite/airdrop';
import { requestTransferByKeypair } from './requestTransferByKeypair';
import { RandomAsset } from 'test-tools/setupAsset';
import { KeypairAccount, TraditionalNft } from '@solana-suite/traditional-nft';

(async () => {
  // random create
  const owner = KeypairAccount.create();
  const feePayer = KeypairAccount.create();

  // faucet
  if (process.env.AIR_DROP) {
    await Airdrop.request(owner.pubkey);
    await Airdrop.request(feePayer.pubkey);
  } else {
    await requestTransferByKeypair(owner.pubkey);
    await requestTransferByKeypair(feePayer.pubkey);
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
    storageType: 'nftStorage',
    isMutable: false,
  };

  const inst = await TraditionalNft.feePayerPartialSignMint(
    owner.pubkey,
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

  const res = await inst.unwrap().submit(feePayer.secret);
  res.match(
    (ok) => console.log('# tx signature: ', ok),
    (err) => assert.fail(err.message),
  );
})();
