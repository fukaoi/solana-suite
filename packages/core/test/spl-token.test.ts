import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Setup} from '../../shared/test/testSetup';
import {Account, SplToken, KeypairStr, Multisig, Transaction} from '../src/';

let source: KeypairStr;
let dest: KeypairStr;
let tokenKeyStr: string;

const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('Create token', async () => {
    const inst =
      await SplToken.mint(
        source.toPublicKey(),
        [source.toKeypair()],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL
      );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    tokenKeyStr = inst.unwrap().data as string;
    console.log('# tokenKey: ', tokenKeyStr);
  });

  it('Create token with multisig', async () => {
    const signer1 = Account.create();
    const signer2 = Account.create();
    const multisigInst = await Multisig.create(
      2,
      source.toKeypair(),
      [
        signer1.toPublicKey(),
        signer2.toPublicKey()
      ],
    );

    assert.isTrue(multisigInst.isOk, `${multisigInst.unwrap()}`);

    const multisig = multisigInst.unwrap().data as string;

    console.log('# multisig address :', multisig);

    const inst =
      await SplToken.mint(
        multisig.toPublicKey(),
        [
          signer1.toKeypair(),
          signer2.toKeypair()
        ],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL,
        source.toKeypair()
      );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);

    const res = await [multisigInst, inst].submit();
    assert.isTrue(res.isOk, res.unwrap());
    tokenKeyStr = inst.unwrap().data as string;
    console.log('# tokenKey: ', tokenKeyStr);
  });

  it('[Err]lack signer for multisig', async () => {
    const signer1 = Account.create();
    const signer2 = Account.create();
    const multisig = await Multisig.create(
      2,
      source.toKeypair(),
      [
        signer1.toPublicKey(),
        signer2.toPublicKey()
      ]
    );

    const mint = await SplToken.mint(
      (multisig.unwrap().data as string).toPublicKey(),
      [
        source.toKeypair(),
        signer1.toKeypair(),
      ],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
    );
    const res = await [
      multisig,
      mint
    ].submit();
    assert.isFalse(res.isOk);
  });

  it('Create token, batch transfer', async () => {
    const inst1 =
      await SplToken.mint(
        source.toPublicKey(),
        [
          source.toKeypair(),
        ],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL,
      );

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
    const token = inst1.unwrap().data as string;
    console.log('# tokenKey: ', token);

    const inst2 = await SplToken.transfer(
      token.toPublicKey(),
      source.toPublicKey(),
      dest.toPublicKey(),
      [
        source.toKeypair(),
      ],
      1,
      MINT_DECIMAL,
      source.toKeypair(),
    );
    assert.isTrue(inst1.isOk);

    const inst3 = await SplToken.transfer(
      token.toPublicKey(),
      source.toPublicKey(),
      dest.toPublicKey(),
      [
        source.toKeypair(),
      ],
      1,
      MINT_DECIMAL,
      source.toKeypair(),
    );
    assert.isTrue(inst2.isOk);

    const sig = await [
      inst1,
      inst2,
      inst3
    ].submit();

    assert.isTrue(sig.isOk, sig.unwrap());
    console.log('signature: ', sig.unwrap());
  });

  it.only('Create token, burn token', async () => {
    const inst1 =
      await SplToken.mint(
        source.toPublicKey(),
        [
          source.toKeypair(),
        ],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL,
      );

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
    const token = inst1.unwrap().data as string;
    console.log('# tokenKey: ', token);

    const inst2 = await SplToken.transfer(
      token.toPublicKey(),
      source.toPublicKey(),
      dest.toPublicKey(),
      [
        source.toKeypair(),
      ],
      1,
      MINT_DECIMAL,
      source.toKeypair(),
    );
    assert.isTrue(inst2.isOk);

    const sig = await [
      inst1,
      inst2,
    ].submit();

    assert.isTrue(sig.isOk, sig.unwrap());
    console.log('signature: ', sig.unwrap());

    await Transaction.confirmedSig(sig.unwrap());

    const res = await SplToken.burn(
      token.toPublicKey(),
      source.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair()],
      1,
      MINT_DECIMAL,
    );

    // assert.isTrue(res.isOk);
    const sig2 = await res.unwrap().submit();
    console.log('signature: ', sig2.unwrap());
  });

  it('Create token, transfer with multisig and fee payer', async () => {
    // create multisig
    const signer1 = Account.create();
    const signer2 = Account.create();
    const multiInst =
      await Multisig.create(
        2,
        source.toKeypair(),
        [
          signer1.toPublicKey(),
          signer2.toPublicKey()
        ]
      );

    assert.isTrue(multiInst.isOk, `${multiInst.unwrap()}`);

    const multisig = (multiInst.unwrap().data as string).toPublicKey();

    console.log('# signer1 address :', signer1.pubkey);
    console.log('# signer2 address :', signer2.pubkey);
    console.log('# multisig address :', multisig.toBase58());

    // create nft
    const mintInst =
      await SplToken.mint(
        multisig,
        [
          source.toKeypair(),
          signer1.toKeypair(),
          signer2.toKeypair(),
        ],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL,
        source.toKeypair()
      );

    assert.isTrue(mintInst.isOk, `${mintInst.unwrap()}`);

    const token = (mintInst.unwrap().data as string).toPublicKey();

    console.log('# tokenKey: ', token.toBase58());

    const inst = await SplToken.transfer(
      token,
      multisig,
      dest.toPublicKey(),
      [
        signer1.toKeypair(),
        signer2.toKeypair(),
      ],
      1,
      MINT_DECIMAL,
      source.toKeypair(),
    );
    assert.isTrue(inst.isOk, `${inst.unwrap()}`);

    const sig = await [
      multiInst,
      mintInst,
      inst
    ].submit();

    console.log('signature: ', `${sig.unwrap()}`);
  });

  it('Retry getOrCreateAssociatedAccountInfo', async () => {
    const mintInst =
      await SplToken.mint(
        source.toPublicKey(),
        [
          source.toKeypair(),
        ],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL,
      );

    await mintInst.submit();

    assert.isTrue(mintInst.isOk, `${mintInst.unwrap()}`);
    const tokenKey = (mintInst.unwrap().data as string);

    SplToken.retryGetOrCreateAssociatedAccountInfo(
      tokenKey.toPublicKey(),
      source.toPublicKey(),
      source.toKeypair()
    );
  });

  it('transfer feePayerPartialSign', async () => {
    const inst1 =
      await SplToken.mint(
        source.toPublicKey(),
        [
          source.toKeypair(),
        ],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL,
      );

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
    await inst1.submit();
    const token = inst1.unwrap().data as string;
    console.log('# tokenKey: ', token);

    const tokenAmount = 1;
    const serialized =
      await SplToken.feePayerPartialSignTransfer(
        token.toPublicKey(),
        source.toPublicKey(),
        dest.toPublicKey(),
        [source.toKeypair()],
        tokenAmount,
        MINT_DECIMAL,
        source.pubkey.toPublicKey()
      );

    assert.isTrue(serialized.isOk, `${serialized.unwrap()}`);
    if (serialized.isOk) {
      const res = await serialized.value.submit(source.toKeypair());
      assert.isTrue(res.isOk, `${res.unwrap()}`);
      console.log('# tx signature: ', res.unwrap());
    }
  });
})
