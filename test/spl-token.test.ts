import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';
import {Wallet, SplToken, Memo, Util, Transaction} from '../src/'

let source: Wallet.KeypairStr;
let destination: Wallet.KeypairStr;
let tokenKeyStr: string;

const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6'.toPubKey();
const MINT_DECIMAL = 2;

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    destination = obj.dest;
  });

  it('Get token transfer history by tokenKey', async () => {
    const res = await SplToken.getTransferHistory(tokenKey, 3);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotEmpty(v.info.authority);
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer history by owner address', async () => {
    const owner = 'FbreoZcjxH4h8qfptQmGEGrwZLcPMbdHfoTJycAjtfu'.toPubKey();
    const res = await SplToken.getTransferHistory(owner);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotEmpty(v.info.authority);
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer destination history', async () => {
    const res = await SplToken.getTransferDestinationList(tokenKey);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.dest);
      assert.isNotNull(v.date);
    });
  });

  it('Create token', async () => {
    if (tokenKeyStr) {
      console.log(`# skip because loaded`);
      return;
    }
    const TOKEN_TOTAL_AMOUNT = 10000000;
    const res =
      await SplToken.mint(
        source.pubkey.toPubKey(),
        source.secret.toKeypair(),
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL
      );

    if (res.isErr) console.error(res.error);
    assert.isTrue(res.isOk);
    tokenKeyStr = res.unwrap();
    console.log('# tokenKey: ', tokenKeyStr);
  });

  // it('multisig test', async () => {
  // const mintAuthority = Wallet.create();
  // const freezeAuthority = Wallet.create();
  // const signer = {
  // publicKey: source.secret.toKeypair().publicKey,
  // secretKey: source.secret.toKeypair().secretKey,
  // }
  // const mid = await SplToken.multisig(
  // '3jQFBgJx6QCG9PUwATVcDfsZEkZnTHJMPLZmRkK2ZVq7'.toPubKey(), 
  // [signer],
  // [mintAuthority.pubkey.toPubKey()]
  // );
  // console.log(mid.toBase58());
  // const res =
  // await SplToken.mint(
  // source.pubkey.toPubKey(),
  // source.secret.toKeypair(),
  // 1,
  // MINT_DECIMAL,
  // );
  // console.log(res);
  // });

  it('Create token with fee payer', async () => {
    let beforeBalance = 0;
    let afterBalance = 0;
    const feePayer = Wallet.create();
    const sig = await Wallet.requestAirdrop(feePayer.pubkey.toPubKey());
    if (sig.isOk) {
      Transaction.confirmedSig(sig.value);
      beforeBalance = (
        await Wallet.getBalance(feePayer.pubkey.toPubKey())
      ).unwrap();
    } else {
      console.error(sig.unwrap());
      assert.isTrue(sig.isErr);
    }

    const TOKEN_TOTAL_AMOUNT = 10000000;
    const res =
      await SplToken.mint(
        source.pubkey.toPubKey(),
        source.secret.toKeypair(),
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL
      );
    if (res.isErr) console.error(res.error);
    assert.isTrue(res.isOk);
    afterBalance = (
      await Wallet.getBalance(feePayer.pubkey.toPubKey())
    ).unwrap();
    console.log(afterBalance, beforeBalance);
    // assert.isTrue(afterBalance - beforeBalance > 0);
  });

  it('Transfer token', async () => {
    const res = await SplToken.transfer(
      tokenKeyStr.toPubKey(),
      source.pubkey.toPubKey(),
      destination.pubkey.toPubKey(),
      [source.secret.toKeypair()],
      1,
      MINT_DECIMAL
    )();
    if (res.isErr) console.error(res.error);
    assert.isTrue(res.isOk);
  });

  it('Transfer transaction with memo data', async () => {
    const memoInst = Memo.createInstruction('{"tokenId": "dummy", "serialNo": "15/100"}');
    const res = await SplToken.transfer(
      tokenKeyStr.toPubKey(),
      source.pubkey.toPubKey(),
      destination.pubkey.toPubKey(),
      [source.secret.toKeypair()],
      5,
      MINT_DECIMAL,
    )({
      txInstructions: [memoInst],
    });
    if (res.isErr) console.error(res.error);
    assert.isTrue(res.isOk);
  });

  it('Subscribe a account(pubkey)', async () => {
    const subscribeId = SplToken.subscribeAccount(
      destination.pubkey.toPubKey(),
      (v: SplToken.TransferHistory) => {
        console.log('# Subscribe result: ', v);
        assert.isNotEmpty(v.type);
        assert.isNotNull(v.date);
        assert.isNotNull(v.info.mint);
        assert.isNotEmpty(v.info.source);
        assert.isNotEmpty(v.info.destination);
      }
    );
    for (let i = 0; i < 3; i++) await sendContinuously();
    await Util.sleep(15);
    SplToken.unsubscribeAccount(subscribeId);
    assert.ok('success subscribe');
  });
})

const sendContinuously = async (): Promise<void> => {
  await SplToken.transfer(
    tokenKeyStr.toPubKey(),
    source.pubkey.toPubKey(),
    destination.pubkey.toPubKey(),
    [source.secret.toKeypair()],
    1,
    MINT_DECIMAL
  )();
}


