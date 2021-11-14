import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';
import {Account, SplToken, Multisig, Util, KeypairStr} from '../src/'

let source: KeypairStr;
let dest: KeypairStr;
let tokenKeyStr: string;

const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6'.toPubkey();
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
    const owner = 'FbreoZcjxH4h8qfptQmGEGrwZLcPMbdHfoTJycAjtfu'.toPubkey();
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
        source.pubkey.toPubkey(),
        [source.secret.toKeypair()],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL
      );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);

    const res = await inst.unwrap().submit();
    assert.isTrue(res.isOk, res.unwrap().sig);
    tokenKeyStr = inst.unwrap().value as string;
    console.log('# tokenKey: ', tokenKeyStr);
  });

  it('[Err]lack signer for multisig', async () => {
    const signer1 = Account.create();
    const signer2 = Account.create();
    const multisig = await Multisig.create(
      2,
      source.toKeypair(),
      [
        signer1.toPubkey(),
        signer2.toPubkey()
      ]
    );

    const TOKEN_TOTAL_AMOUNT = 10000000;
    const mint = await SplToken.mint(
      (multisig.unwrap().value as string).toPubkey(),
      [
        source.toKeypair(),
        signer1.toKeypair(),
      ],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
    );
    const res = await [
      multisig.unwrap(),
      mint.unwrap()
    ].submit();
    assert.isFalse(res.isOk);
  });

  it('Create token, batch transfer', async () => {
    const TOKEN_TOTAL_AMOUNT = 10000000;
    const inst1 =
      await SplToken.mint(
        source.pubkey.toPubkey(),
        [
          source.secret.toKeypair(),
        ],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL,
      );

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
    const token = inst1.unwrap().value as string;
    console.log('# tokenKey: ', token);

    const inst2 = await SplToken.transfer(
      token.toPubkey(),
      source.pubkey.toPubkey(),
      dest.pubkey.toPubkey(),
      [
        source.secret.toKeypair(),
      ],
      1,
      MINT_DECIMAL,
      source.secret.toKeypair(),
    );
    assert.isTrue(inst1.isOk);

    const inst3 = await SplToken.transfer(
      token.toPubkey(),
      source.pubkey.toPubkey(),
      dest.pubkey.toPubkey(),
      [
        source.secret.toKeypair(),
      ],
      1,
      MINT_DECIMAL,
      source.secret.toKeypair(),
    );
    assert.isTrue(inst2.isOk);

    const sig = await [
      inst1.unwrap(),
      inst2.unwrap(),
      inst3.unwrap()
    ].submit();

    assert.isTrue(sig.isOk, sig.unwrap().sig);
    console.log('signature: ', sig.unwrap().sig.toSigUrl());
  });

  it('Create token, transfer with multisig and fee payer', async () => {
    const signer1 = Account.create();
    const signer2 = Account.create();
    const multiInst =
      await Multisig.create(
        2,
        source.secret.toKeypair(),
        [
          signer1.pubkey.toPubkey(),
          signer2.pubkey.toPubkey()
        ]
      );

    assert.isTrue(multiInst.isOk, `${multiInst.unwrap()}`);

    const multisig = (multiInst.unwrap().value as string).toPubkey();

    const TOKEN_TOTAL_AMOUNT = 10000000;
    const mintInst =
      await SplToken.mint(
        multisig,
        [
          source.secret.toKeypair(),
          signer1.secret.toKeypair(),
          signer2.secret.toKeypair(),
        ],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL,
        source.secret.toKeypair()
      );

    assert.isTrue(mintInst.isOk, `${mintInst.unwrap()}`);

    const token = (mintInst.unwrap().value as string).toPubkey();
    const inst = await SplToken.transfer(
      token,
      multisig,
      dest.pubkey.toPubkey(),
      [
        signer1.secret.toKeypair(),
        signer2.secret.toKeypair(),
      ],
      1,
      MINT_DECIMAL,
      source.secret.toKeypair(),
    );
    assert.isTrue(inst.isOk, `${inst.unwrap()}`);

    const sig = await [
      multiInst.unwrap(), 
      mintInst.unwrap(),
      inst.unwrap()
    ].submit();

    console.log('signature: ', `${sig.unwrap().sig.toSigUrl()}`);
  });

  it('Subscribe a account(pubkey)', async () => {
    const subscribeId = SplToken.subscribeAccount(
      dest.pubkey.toPubkey(),
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
  const inst = await SplToken.transfer(
    tokenKeyStr.toPubkey(),
    source.pubkey.toPubkey(),
    dest.pubkey.toPubkey(),
    [source.secret.toKeypair()],
    1,
    MINT_DECIMAL
  );
  inst.isOk && inst.value.submit();
}


