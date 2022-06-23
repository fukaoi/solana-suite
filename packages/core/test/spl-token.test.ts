import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Setup} from '../../shared/test/testSetup';
import {Account, SplToken, KeypairStr, Multisig, Transaction, Pubkey} from '../src/';
import {PublicKey} from '@solana/web3.js';

let source: KeypairStr;
let dest: KeypairStr;
let mintStr: string;

const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('Calculate token amount', async () => {
    const res1 = SplToken.calcurateAmount(1, 2);
    assert.equal(res1, 100);

    const res2 = SplToken.calcurateAmount(0.1, 2);
    assert.equal(res2, 10);

    const res3 = SplToken.calcurateAmount(0.1, 0);
    assert.equal(res3, 0.1);

    const res4 = SplToken.calcurateAmount(0.001, 5);
    assert.equal(res4, 100);
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
    mintStr = inst.unwrap().data as string;
    console.log('# mint: ', mintStr);
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
    mintStr = inst.unwrap().data as string;
    console.log('# mint: ', mintStr);
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
    console.log('# mint: ', token);

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

  it('Create token, burn token', async () => {
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
    console.log('# mint: ', token);

    const burnAmount = 500000;
    const inst2 = await SplToken.burn(
      token.toPublicKey(),
      source.toPublicKey(),
      [source.toKeypair()],
      burnAmount,
      MINT_DECIMAL,
    );

    assert.isTrue(inst2.isOk);
    const sig = await [inst1, inst2].submit();
    console.log('signature: ', sig.unwrap());

    // time wait
    await Transaction.confirmedSig(sig.unwrap());

    const res = await Account.getTokenBalance(source.toPublicKey(), token.toPublicKey());
    assert.isTrue(res.isOk);
    assert.equal(res.unwrap().uiAmount, TOKEN_TOTAL_AMOUNT - burnAmount);
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

    let multisig!: PublicKey;

    (await multiInst.submit()).match(
      (_) => multisig = (multiInst.unwrap().data as string).toPublicKey(),
      (err) => assert.fail(err.message)
    );

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

    let token!: PublicKey;

    (await mintInst.submit()).match(
      (_) => token = (mintInst.unwrap().data as string).toPublicKey(),
      (err) => assert.fail(err.message)
    );

    console.log('# mint: ', token.toBase58());

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

    (await inst.submit()).match(
      (ok) => console.log('signature: ', ok),
      (err) => assert.fail(err.message)
    );
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
    const mint = (mintInst.unwrap().data as string);

    const res = await SplToken.retryGetOrCreateAssociatedAccountInfo(
      mint.toPublicKey(),
      source.toPublicKey(),
      source.toKeypair()
    );

    res.match(
      (ok) => {
        console.log('# associated token account: ', ok);
        assert.isString(ok)
      },
      (err) => assert.fail(err.message)
    );
  });

  it('transfer feePayerPartialSign', async () => {
    const tokenowner = Account.create();
    const receipt = Account.create();
    console.log('# tokenowner: ', tokenowner.pubkey);
    console.log('# receipt: ', receipt.pubkey);

    const inst1 =
      await SplToken.mint(
        tokenowner.toPublicKey(),
        [
          tokenowner.toKeypair(),
        ],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL,
        source.toKeypair()
      );

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
    await inst1.submit();
    const token = inst1.unwrap().data as string;
    console.log('# mint: ', token);

    const serialized =
      await SplToken.feePayerPartialSignTransfer(
        token.toPublicKey(),
        tokenowner.toPublicKey(),
        receipt.toPublicKey(),
        [tokenowner.toKeypair()],
        100,
        MINT_DECIMAL,
        source.toPublicKey()
      );

    assert.isTrue(serialized.isOk, `${serialized.unwrap()}`);

    if (serialized.isOk) {
      const res = await serialized.value.submit(source.toKeypair());
      assert.isTrue(res.isOk, `${res.unwrap()}`);
      console.log('# tx signature: ', res.unwrap());
    }
  });
})
