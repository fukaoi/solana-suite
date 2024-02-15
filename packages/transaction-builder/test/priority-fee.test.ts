import test from 'ava';
import { CompressedNft } from '~/suite-compressed-nft';
import { SolNative } from '~/suite-sol-native';
import { KeypairAccount } from '~/types/account';
import { Pubkey } from '~/types/account';
import { Setup } from 'test-tools/setup';
import { DasApi } from '~/das-api';

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

test('[CommonInstruction]Set priority fee', async (t) => {
  const solAmount = 0.01;
  const inst = SolNative.transfer(
    source.pubkey,
    dest.pubkey,
    [source.secret],
    solAmount,
  );

  const testUri =
    'https://mainnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92';
  DasApi.changeDasUri(testUri);

  (await inst.submit({ isPriorityFee: true })).match(
    (ok) => {
      t.log(ok);
      t.pass();
    },
    (err) => {
      t.log(err);
      t.fail(err.message);
    },
  );
});

test('[MintInstruction]Set priority fee', async (t) => {
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

  const testUri =
    'https://mainnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92';
  DasApi.changeDasUri(testUri);

  (await inst.submit({ isPriorityFee: true })).match(
    (ok) => {
      t.log(ok);
      t.pass();
    },
    (err) => {
      t.log(err);
      t.fail(err.message);
    },
  );
});

test.only('[PartialSignStructure]Set priority fee', async (t) => {
  const solAmount = 0.01;
  const serialized = await SolNative.gasLessTransfer(
    source.secret,
    dest.pubkey,
    solAmount,
    feePayer.pubkey,
  );
  const testUri =
    'https://mainnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92';
  DasApi.changeDasUri(testUri);

  (await serialized.submit({ feePayer: feePayer.secret })).match(
    (ok) => {
      t.log('# tx signature: ', ok);
      t.pass();
    },
    (err) => {
      console.error(err);
      t.fail(err.message);
    },
  );
});
