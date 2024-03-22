import test from 'ava';
import { CompressedNft } from '~/suite-compressed-nft';
import { SolNative } from '~/suite-sol-native';
import { KeypairAccount } from '~/types/account';
import { Pubkey } from '~/types/account';
import { Setup } from 'test-tools/setup';
import { TransactionBuilder } from '../src';
import { RegularNft } from '~/suite-regular-nft';
import { SplToken } from '~/suite-spl-token';

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

test.only('[Transfer] estimate priority fee', async (t) => {
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

test.only('[Mint cNFT] estimate priority fee', async (t) => {
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

test('[CommonInstruction] Submit with priority fee', async (t) => {
  const solAmount = 0.01;
  const inst = SolNative.transfer(
    source.pubkey,
    dest.pubkey,
    [source.secret],
    solAmount,
  );

  // 0.00001SOL => 10000Lamports => 10000000000MicroLamports
  (
    await inst.submit({ isPriorityFee: true, addSolPriorityFee: 0.00001 })
  ).match(
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

test('[CommonInstruction] cNFT Submit with priority fee', async (t) => {
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

test('[MintInstruction] Submit with priority fee', async (t) => {
  const inst = await RegularNft.mint(
    source.secret,
    {
      uri: 'https://ipfs.io/ipfs/bafkreifttd3wb3jfwh6ouumnukidh32u47kpr4qhm7n4rpol5iytsvb5tu',
      name: 'priority test',
      symbol: 'PRTEST',
    },
    {
      feePayer: feePayer.secret,
    },
  );

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

test('[PartialSignStructure] Submit with priority fee', async (t) => {
  const solAmount = 0.01;
  const serialized = await SolNative.gasLessTransfer(
    source.secret,
    dest.pubkey,
    solAmount,
    feePayer.pubkey,
    // { isPriorityFee: true },
  );

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

test('[BatchStructure] Submit with priority fee', async (t) => {
  const TOKEN_METADATA = {
    name: 'solana-suite-token',
    symbol: 'SST',
    royalty: 50,
    uri: 'https://ipfs.io/ipfs/bafkreifttd3wb3jfwh6ouumnukidh32u47kpr4qhm7n4rpol5iytsvb5tu',
    isMutable: false,
  };

  const MINT_DECIMAL = 3;
  const inst1 = await SplToken.mint(
    source.secret,
    10000,
    MINT_DECIMAL,
    TOKEN_METADATA,
    { feePayer: feePayer.secret },
  );

  t.true(inst1.isOk, `${inst1.unwrap()}`);
  const token = inst1.unwrap().data as string;
  t.log('# mint: ', token);

  const burnAmount = 500;
  const inst2 = SplToken.burn(
    token,
    source.pubkey,
    [source.secret],
    burnAmount,
    MINT_DECIMAL,
    { feePayer: feePayer.secret },
  );

  t.true(inst2.isOk);

  const sig = await [inst1, inst2].submit({ isPriorityFee: true });
  t.log('# signature: ', sig.unwrap());
});
