import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';
import {Wallet, SplToken, Memo, Util, Multisig} from '../src/'
import {ASSOCIATED_TOKEN_PROGRAM_ID, Token, TOKEN_PROGRAM_ID} from '@solana/spl-token';

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
    const TOKEN_TOTAL_AMOUNT = 10000000;
    const res =
      await SplToken.mint(
        source.pubkey.toPubKey(),
        [source.secret.toKeypair()],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL
      )();

    assert.isTrue(res.isOk, res.unwrap());
    tokenKeyStr = res.unwrap();
    console.log('# tokenKey: ', tokenKeyStr);
  });

  it('[Err]lack signer for multisig', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const multisig = await Multisig.create(
      2,
      source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey()
      ]
    )();

    assert.isTrue(multisig.isOk, multisig.unwrap());

    const TOKEN_TOTAL_AMOUNT = 10000000;
    const res =
      await SplToken.mint(
        multisig.unwrap().toPubKey(),
        [
          source.secret.toKeypair(),
        ],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL,
      )({
        feePayer: source.pubkey.toPubKey(),
        multiSig: multisig.unwrap().toPubKey()
      });
    assert.isFalse(res.isOk);
  });


  it.only('Create token, transfer with multisig and fee payer', async () => {
    // const signer1 = Wallet.create();
 // const signer2 = Wallet.create();
    const signer1 = {
      pubkey: '3F12z9sB2bvuZVcdo7VyKvDvsboD1akUUEcXPgLwP5dy',
      secret: '2ymrPyWHeZJK9rj8cgCXr77463H2AcVmVLRQ2cTKQZGyXB4zYft4wbtEjtDV9bANdCmfuW8uAefbLkFEnpx9Wnwh'
    };
    const signer2 = {
      pubkey: '48dWuQ42QfTH2ak925fxJnaUmeBizLuRm2sPCB1jzuPw',
      secret: 'GZKjz7biHw2ZQkuV5bYHBXE5oXvVeg948L6Pev9QzE5ADTafA3UGgWnbPxqRmnj78UTRdD1a3fzfwXMpPWd7VDK'
    };
    const multisig = await Multisig.create(
      2,
      source.secret.toKeypair(),
      [signer1.pubkey.toPubKey(), signer2.pubkey.toPubKey()]
    )();

    assert.isTrue(multisig.isOk, multisig.unwrap());
    console.log('# multisig address: ', multisig.unwrap());
    // const multisig = '8ZtJUa75qSoKKKpAqhRZhHRzvm1EGJGeqSMjf86hkcLH';

    const TOKEN_TOTAL_AMOUNT = 10000000;
    const res =
      await SplToken.mint(
        multisig.unwrap().toPubKey(),
        // multisig.toPubKey(),
        [
          source.secret.toKeypair(),
          signer1.secret.toKeypair(),
          signer2.secret.toKeypair(),
        ],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL,
      )({
        feePayer: source.pubkey.toPubKey(),
        multiSig: multisig.unwrap().toPubKey()
        // multiSig: multisig.toPubKey()
      });

    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tokenKey: ', res.unwrap());
    const token = res.unwrap();
    // const token = 'EFbBV7nRsFUmyr7B4a6yYUBL42zVzyzdUiFSZPTbN8PA';

    console.log('token: ', token);
    console.log('multisig: ', multisig);
    console.log('signer1: ', signer1.pubkey);
    console.log('signer2: ', signer2.pubkey);

    const transferRes = await SplToken.transfer(
      token.toPubKey(),
      multisig.unwrap().toPubKey(),
      // multisig.toPubKey(),
      destination.pubkey.toPubKey(),
      [
        source.secret.toKeypair(),
        signer1.secret.toKeypair(),
        signer2.secret.toKeypair(),
      ],
      1,
      MINT_DECIMAL
    )({
      multiSig: multisig.unwrap().toPubKey(),
      // multiSig: multisig.toPubKey(),
      feePayer: source.pubkey.toPubKey()
    });
    assert.isTrue(transferRes.isOk, transferRes.unwrap());
  });

  it('Create token with fee payer', async () => {
    const owner = Wallet.create();
    const feePayer = source;
    const before = (await Wallet.getBalance(feePayer.pubkey.toPubKey())).unwrap();
    const TOKEN_TOTAL_AMOUNT = 10000000;
    const res =
      await SplToken.mint(
        owner.pubkey.toPubKey(),
        [
          feePayer.secret.toKeypair(),
          owner.secret.toKeypair(),
        ],
        TOKEN_TOTAL_AMOUNT,
        MINT_DECIMAL
      )({
        feePayer: feePayer.pubkey.toPubKey()
      });
    assert.isTrue(res.isOk, res.unwrap());
    const after = (await Wallet.getBalance(feePayer.pubkey.toPubKey())).unwrap();
    console.log('# tokenKey: ', res.unwrap());
    assert.isTrue(before > after, `before fee: ${before}, after fee: ${after}`);
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
    assert.isTrue(res.isOk, res.unwrap());
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
    assert.isTrue(res.isOk, res.unwrap());
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


