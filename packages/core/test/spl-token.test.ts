import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Setup} from '../../shared/test/setup';
import {Account, SplToken, Multisig, KeypairStr} from '../src/'

let source: KeypairStr;
let dest: KeypairStr;
let tokenKeyStr: string;

const MINT_DECIMAL = 2;
describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    dest = obj.dest;
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

    const res = await inst.submit();
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
        signer1.toPubkey(),
        signer2.toPubkey()
      ]
    );

    const TOKEN_TOTAL_AMOUNT = 10000000;
    const mint = await SplToken.mint(
      (multisig.unwrap().data as string).toPubkey(),
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
    const token = inst1.unwrap().data as string;
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
      inst1,
      inst2,
      inst3
    ].submit();

    assert.isTrue(sig.isOk, sig.unwrap());
    console.log('signature: ', sig.unwrap());
  });

  it('Create token, transfer with multisig and fee payer', async () => {
    // create multisig
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

    const multisig = (multiInst.unwrap().data as string).toPubkey();

    console.log('# multisig address :', multisig.toBase58());

    // create nft
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

    const token = (mintInst.unwrap().data as string).toPubkey();

    console.log('# tokenKey: ', token.toBase58());

    // transfer from multisig to dest
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
      multiInst,
      mintInst,
      inst
    ].submit();

    console.log('signature: ', `${sig.unwrap()}`);
  });
})
