import test from 'ava';
import { CompressedNft } from '../src';
import { Node } from '~/node';
import { KeypairAccount, Pubkey } from '~/types/account';
import { Setup } from 'test-tools/setup';
import { PartialSignTransaction } from '../../transaction/src/partial-sign';
import { Transaction } from '@solana/web3.js';

let source: KeypairAccount;
let feePayer: KeypairAccount;
let mint: Pubkey;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  feePayer = obj.feePayer;
});

test.beforeEach(async (t) => {
  const assets = await CompressedNft.findByOwner(source.pubkey);
  if (assets.isErr) {
    t.fail(assets.error.message);
  }
  mint = assets.unwrap().metadatas[0].mint;
  t.log('# mint: ', mint);
});

test.only('Gas-less new delegate signer', async (t) => {
  const blockhashObj = await Node.getConnection().getLatestBlockhash();
  const tx = new Transaction({
    lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
    blockhash: blockhashObj.blockhash,
    feePayer: source.pubkey.toPublicKey(),
  });
  tx.add(
    await CompressedNft.createDeleagate(
      mint.toPublicKey(),
      feePayer.pubkey.toPublicKey(),
    ),
  );

  tx.recentBlockhash = blockhashObj.blockhash;

  (
    await new PartialSignTransaction(
      tx
        .serialize({
          requireAllSignatures: false,
        })
        .toString('hex'),
    ).submit(source.secret)
  ).match(
    (ok) => t.log(ok),
    (err) => console.error(err),
  );
});

test('Set new delegate signer', async (t) => {
  const res = await (
    await CompressedNft.setDelegate(mint, source.secret, {
      delegate: feePayer.pubkey,
    })
  ).submit();

  res.match(
    (ok: string) => {
      t.log('# sig: ', ok);
      t.pass();
    },
    (err: Error) => {
      console.error(err);
      t.fail(err.message);
    },
  );
});
