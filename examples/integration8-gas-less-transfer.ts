//////////////////////////////////////////////
// $ npx ts-node examples/integration8-gas-less-transfer
//////////////////////////////////////////////

import assert from 'assert';
import { Airdrop } from '@solana-suite/airdrop';
import { SplToken } from '@solana-suite/spl-token';
import { SolNative } from '@solana-suite/sol-native';
import { Account, Pubkey } from '@solana-suite/utils';
import { requestSol } from 'test-tools';
import { RandomAsset } from 'test-tools/setupAsset';

(async () => {
  // random create
  const owner = Account.Keypair.create();
  const tokenOwner = Account.Keypair.create();
  const dest = Account.Keypair.create();
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
  console.log('# tokenOwner: ', tokenOwner);
  console.log('# dest: ', dest);

  // SOL version //
  //////////////////////////////////////////////
  // CREATE HEX INSTRUCTION(Client side)
  //////////////////////////////////////////////

  const inst = await SolNative.gasLessTransfer(
    owner.secret,
    dest.pubkey,
    0.001,
    feePayer.pubkey,
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

  // SPL-TOKEN version //
  //////////////////////////////////////////////
  // CREATE HEX INSTRUCTION(Client side)
  //////////////////////////////////////////////
  const decimals = 1;
  const tokenMetadata = {
    name: 'solana-suite-token',
    symbol: 'SST',
    royalty: 50,
    filePath: RandomAsset.get().filePath as string,
    storageType: 'nftStorage',
    isMutable: false,
  };

  const mintInst = await SplToken.mint(
    tokenOwner.secret,
    10000,
    decimals,
    tokenMetadata,
    { feePayer: feePayer.secret },
  );

  await mintInst.submit();

  const inst2 = await SplToken.gasLessTransfer(
    mintInst.unwrap().data as Pubkey,
    tokenOwner.secret,
    dest.pubkey,
    100,
    decimals,
    feePayer.pubkey,
  );

  // =============================================== //
  // == SEND HEX VALUE(Client side => Sever side) == //
  // =============================================== //

  //////////////////////////////////////////////
  // SIGN FEE PAYER AND SUBMIT (Server side)
  //////////////////////////////////////////////

  const res2 = await inst2.unwrap().submit(feePayer.secret);
  res2.match(
    (ok) => console.log('# tx signature: ', ok),
    (err) => assert.fail(err.message),
  );
})();
