import {describe, it, before} from 'mocha';
import {SolNative, Memo, Wallet, Multisig} from '../src';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';

let source: Wallet.KeypairStr;
let destination: Wallet.KeypairStr;

describe('SolNative', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    destination = obj.dest;
  });

  it('transfer transaction', async () => {
    const solAmount = 0.0001;
    const res =
      await SolNative.transfer(
        source.pubkey.toPubKey(),
        destination.pubkey.toPubKey(),
        [source.secret.toKeypair()],
        solAmount,
      )();

    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('transfer transaction with memo data', async () => {
    const solAmount = 0.0001;
    const instruction = Memo.createInstruction(
      '{"tokenId": "dummy", "serialNo": "15/100"}'
    );
    const res = await SolNative.transfer(
      source.pubkey.toPubKey(),
      destination.pubkey.toPubKey(),
      [source.secret.toKeypair()],
      solAmount,
    )({
      txInstructions: [instruction]
    });
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('transfer transaction with fee payer', async () => {
    const solAmount = 0.0001;
    const feePayer = Wallet.create();
    const before = (await Wallet.getBalance(feePayer.pubkey.toPubKey())).unwrap();
    const res = await SolNative.transfer(
      source.pubkey.toPubKey(),
      destination.pubkey.toPubKey(),
      [
        source.secret.toKeypair(),
        feePayer.secret.toKeypair()
      ],
      solAmount,
    )({
      feePayer: feePayer.pubkey.toPubKey()
    });
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
    const after = (await Wallet.getBalance(feePayer.pubkey.toPubKey())).unwrap();
    assert.isTrue(before > after, `before fee: ${before}, after fee: ${after}`);
  });

  it('Wrapped transfer sol', async () => {
    const res = await SolNative.wrappedTransfer(
      source.pubkey.toPubKey(),
      destination.pubkey.toPubKey(),
      [source.secret.toKeypair()],
      0.00001
    )();
    console.log(res);
  });

  it('Wrapped transfer sol with fee payer', async () => {
    const feePayer = Wallet.create();
    const dropped = await Wallet.requestAirdrop(feePayer.pubkey.toPubKey());
    assert.isTrue(dropped.isOk, dropped.unwrap());
    const res = await SolNative.wrappedTransfer(
      source.pubkey.toPubKey(),
      destination.pubkey.toPubKey(),
      [
        source.secret.toKeypair(),
        feePayer.secret.toKeypair()
      ],
      0.00001
    )({
      feePayer: feePayer.pubkey.toPubKey()
    });
    console.log(res);
  });

  it.only('transfer transaction with fee payer and  ulti sig', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const feePayer = source;
    const multi = await Multisig.create(
      2,
      feePayer.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
      ]
    )();

    assert.isTrue(multi.isOk, multi.unwrap());
    const airdropRes = await Wallet.requestAirdrop(multi.unwrap().toPubKey());
    assert.isTrue(airdropRes.isOk, airdropRes.unwrap());

    console.log('signer1:', signer1.pubkey);
    console.log('signer2:', signer2.pubkey);
    console.log('multi:', multi.unwrap());

    const res = await SolNative.wrappedTransfer(
      multi.unwrap().toPubKey(),
      destination.pubkey.toPubKey(),
      [
        feePayer.secret.toKeypair(),
        signer1.secret.toKeypair(),
        signer2.secret.toKeypair(),
      ],
      0.0001,
    )({
      feePayer: feePayer.pubkey.toPubKey(),
      multiSig: multi.unwrap().toPubKey()
    });
    console.log(res);
    // assert.isTrue(res.isOk, res.unwrap());
    // console.log('# tx signature: ', res.unwrap());
  });
})
