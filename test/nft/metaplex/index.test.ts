import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Wallet, Multisig} from '../../../src';
import {Metaplex, MetaplexInstructure} from '../../../src/nft/metaplex';
import {Setup} from '../../../test/utils/setup';

let source: Wallet.KeypairStr;

describe('Metaplex', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Mint nft', async () => {
    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const res = await Metaplex.mint(
      data,
      source.secret.toKeypair(),
    );

    assert.isTrue(res.isOk);
    console.log(`# tokenKey: ${(<Metaplex.MintResult>res.unwrap()).tokenKey}`);
    console.log(`# tx signature: ${(<Metaplex.MintResult>res.unwrap()).signature}`);
  });

  it.only('Mint2 nft with multi sig', async () => {
    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

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

    const airdropRes = await Wallet.requestAirdrop(multisig.unwrap().toPubKey());
    assert.isTrue(airdropRes.isOk, airdropRes.unwrap()); 

    console.log('multisig: ', multisig.unwrap());
    console.log('signer1: ', signer1.pubkey);
    console.log('signer2: ', signer2.pubkey);

    const res = await Metaplex.mint2(
      data,
      source.pubkey.toPubKey(),
      // multisig.unwrap().toPubKey(),
      [
        source.secret.toKeypair(),
        signer1.secret.toKeypair(),
        signer2.secret.toKeypair(),
      ]
    )({
      multiSig: multisig.unwrap().toPubKey(),
      feePayer: source.pubkey.toPubKey(),
    });

    assert.isTrue(res.isOk, res.unwrap().toString());
    console.log(`# tokenKey: ${(<Metaplex.MintResult>res.unwrap()).tokenKey}`);
    console.log(`# tx signature: ${(<Metaplex.MintResult>res.unwrap()).signature}`);
  });
});
