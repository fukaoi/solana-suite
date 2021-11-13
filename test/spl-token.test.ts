import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';
import {Wallet, SplToken, Util, Multisig, Instruction} from '../src/'

let source: Wallet.KeypairStr;
let dest: Wallet.KeypairStr;
let tokenKeyStr: string;

const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6'.toPubKey();
const MINT_DECIMAL = 2;

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    dest = obj.dest;
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
    const TOKEN_TOTAL_AMOUNT = 10000000;
    const inst =
      await SplToken.mint(
        source.pubkey.toPubKey(),
        [source.secret.toKeypair()],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL
      );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);

    const res = await inst.unwrap().instruction.submit();
    assert.isTrue(res.isOk, res.unwrap());
    tokenKeyStr = inst.unwrap().tokenKey;
    console.log('# tokenKey: ', tokenKeyStr);
  });

  it.only('[Err]lack signer for multisig', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const multisig = await Multisig.create(
      2,
      source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey()
      ]
    );

    assert.isTrue(multisig.isOk, `${multisig.unwrap()}`);

    const TOKEN_TOTAL_AMOUNT = 10000000;
    const res = await SplToken.mint(
      multisig.unwrap().multisig.toPubKey(),
      [
        source.secret.toKeypair(),
      ],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
    );
    console.log(res);
    assert.isFalse(res.isOk, `${res.unwrap()}`);
  });

    // it('Create token, batch transfer', async () => {
    // const TOKEN_TOTAL_AMOUNT = 10000000;
    // const res =
    // await SplToken.mint(
    // source.pubkey.toPubKey(),
    // [
    // source.secret.toKeypair(),
    // ],
    // TOKEN_TOTAL_AMOUNT,
    // MINT_DECIMAL,
    // )();

    // assert.isTrue(res.isOk, res.unwrap());
    // console.log('# tokenKey: ', res.unwrap());
    // const token = res.unwrap();

    // const inst1 = await SplToken.transfer(
    // token.toPubKey(),
    // source.pubkey.toPubKey(),
    // dest.pubkey.toPubKey(),
    // [
    // source.secret.toKeypair(),
    // ],
    // 1,
    // MINT_DECIMAL,
    // source.secret.toKeypair(),
    // );
    // assert.isTrue(inst1.isOk);

    // const inst2 = await SplToken.transfer(
    // token.toPubKey(),
    // source.pubkey.toPubKey(),
    // dest.pubkey.toPubKey(),
    // [
    // source.secret.toKeypair(),
    // ],
    // 1,
    // MINT_DECIMAL,
    // source.secret.toKeypair(),
    // );
    // assert.isTrue(inst2.isOk);

    // const sig = await [inst1.unwrap(), inst2.unwrap()].submit();
    // assert.isTrue(sig.isOk, sig.unwrap());
    // console.log('signature: ', sig.unwrap().toSigUrl());
    // });

    // it('Create token, transfer with multisig and fee payer', async () => {
    // const signer1 = Wallet.create();
    // const signer2 = Wallet.create();
    // const multisig = await Multisig.create(
    // 2,
    // source.secret.toKeypair(),
    // [signer1.pubkey.toPubKey(), signer2.pubkey.toPubKey()]
    // );

    // assert.isTrue(multisig.isOk, `${multisig.unwrap()}`);

    // const TOKEN_TOTAL_AMOUNT = 10000000;
    // const res =
    // await SplToken.mint(
    // multisig.unwrap().multisig.toPubKey(),
    // [
    // source.secret.toKeypair(),
    // signer1.secret.toKeypair(),
    // signer2.secret.toKeypair(),
    // ],
    // TOKEN_TOTAL_AMOUNT,
    // MINT_DECIMAL,
    // )({
    // feePayer: source.pubkey.toPubKey(),
    // multiSig: multisig.unwrap().multisig.toPubKey()
    // });

    // assert.isTrue(res.isOk, res.unwrap());
    // const token = res.unwrap();
    // const inst = await SplToken.transfer(
    // token.toPubKey(),
    // multisig.unwrap().multisig.toPubKey(),
    // dest.pubkey.toPubKey(),
    // [
    // signer1.secret.toKeypair(),
    // signer2.secret.toKeypair(),
    // ],
    // 1,
    // MINT_DECIMAL,
    // source.secret.toKeypair(),
    // );
    // assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    // const sig = await inst.unwrap().submit();
    // console.log('signature: ', `${sig.unwrap().toSigUrl()}`);
    // });

    // it('Create token with fee payer', async () => {
    // const owner = Wallet.create();
    // const feePayer = source;
    // const before = (await Wallet.getBalance(feePayer.pubkey.toPubKey())).unwrap();
    // const TOKEN_TOTAL_AMOUNT = 10000000;
    // const res =
    // await SplToken.mint(
    // owner.pubkey.toPubKey(),
    // [
    // feePayer.secret.toKeypair(),
    // owner.secret.toKeypair(),
    // ],
    // TOKEN_TOTAL_AMOUNT,
    // MINT_DECIMAL
    // )({
    // feePayer: feePayer.pubkey.toPubKey()
    // });
    // assert.isTrue(res.isOk, res.unwrap());
    // const after = (await Wallet.getBalance(feePayer.pubkey.toPubKey())).unwrap();
    // console.log('# tokenKey: ', res.unwrap());
    // assert.isTrue(before > after, `before fee: ${before}, after fee: ${after}`);
    // });

    // it('Subscribe a account(pubkey)', async () => {
    // const subscribeId = SplToken.subscribeAccount(
    // dest.pubkey.toPubKey(),
    // (v: SplToken.TransferHistory) => {
    // console.log('# Subscribe result: ', v);
    // assert.isNotEmpty(v.type);
    // assert.isNotNull(v.date);
    // assert.isNotNull(v.info.mint);
    // assert.isNotEmpty(v.info.source);
    // assert.isNotEmpty(v.info.destination);
    // }
    // );
    // for (let i = 0; i < 3; i++) await sendContinuously();
    // await Util.sleep(15);
    // SplToken.unsubscribeAccount(subscribeId);
    // assert.ok('success subscribe');
    // });
  })

  const sendContinuously = async (): Promise<void> => {
    const inst = await SplToken.transfer(
      tokenKeyStr.toPubKey(),
      source.pubkey.toPubKey(),
      dest.pubkey.toPubKey(),
      [source.secret.toKeypair()],
      1,
      MINT_DECIMAL
    );
    inst.isOk && inst.value.submit();
  }


