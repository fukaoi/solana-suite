import test from 'ava';
import { CompressedNft } from '~/suite-compressed-nft';
import { SolNative } from '~/suite-sol-native';
import { KeypairAccount } from '~/types/account';
import { Pubkey } from '~/types/account';
import { Setup } from 'test-tools/setup';
import { TransactionBuilder } from '../src';

let source: KeypairAccount;
let dest: KeypairAccount;
let feePayer: KeypairAccount;
let treeOwner: Pubkey;
let collectionMint: Pubkey;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  dest = obj.dest;
  feePayer = obj.feePayer;
  treeOwner = obj.treeOwner;
  collectionMint = obj.collectionMint;
});

test('[Transfer]estimate priority fee', async (t) => {
  const solAmount = 0.01;
  const inst = SolNative.transfer(
    source.pubkey,
    dest.pubkey,
    [source.secret],
    solAmount,
  );

  const res = await TransactionBuilder.PriorityFee.estimatePriorityFee(
    inst.unwrap().instructions,
  );
  t.log('# priority fee: ', res);
  t.true(res >= 0);
});

test('[Mint cNFT]estimate priority fee', async (t) => {
  const inst = await CompressedNft.mint(
    source.secret,
    {
      uri: 'https://ipfs.io/ipfs/bafkreifttd3wb3jfwh6ouumnukidh32u47kpr4qhm7n4rpol5iytsvb5tu',
      name: 'priority test',
      symbol: 'PRTEST',
    },
    treeOwner,
    collectionMint,
    {
      feePayer: feePayer.secret,
    },
  );

  const res = await TransactionBuilder.PriorityFee.estimatePriorityFee(
    inst.unwrap().instructions,
  );
  t.log('# priority fee: ', res);
  t.true(res >= 0);
});
