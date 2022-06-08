import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Account, KeypairStr, Multisig, Pubkey, SplToken, Transaction} from '@solana-suite/core';
import {Metaplex, MetaplexInstructure} from '../../src/metaplex';
import {Setup} from '../../../shared/test/testSetup';

let source: KeypairStr;
let dest: KeypairStr;

describe('Metaplex', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('Mint nft', async () => {
    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const inst = await Metaplex.mint(
      data,
      source.toPublicKey(),
      [source.toKeypair()],
    );

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# mint: ', inst.unwrap().data);
    console.log('# signature: ', res.unwrap());
  });

  it('Mint nft and Burn nft', async () => {
    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const inst = await Metaplex.mint(
      data,
      source.toPublicKey(),
      [source.toKeypair()],
    );

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());

    const mint = inst.unwrap().data as Pubkey;

    console.log('# mint: ', mint);
    console.log('# signature: ', res.unwrap());

    const inst2 = await Metaplex.burn(
      mint.toPublicKey(),
      source.toPublicKey(),
      [source.toKeypair()]
    );

    const res2 = await inst2.submit();
    assert.isTrue(res2.isOk, res2.unwrap());
    console.log('# signature: ', res2.unwrap());
  });

  it('Mint batched nft', async () => {
    const data = new MetaplexInstructure.Data({
      name: 'NFT',
      symbol: 'NFT',
      uri: 'https://example.com',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const inst1 = await Metaplex.mint(
      data,
      source.toPublicKey(),
      [source.toKeypair()],
    );
    const inst2 = await Metaplex.mint(
      data,
      source.toPublicKey(),
      [source.toKeypair()],
    );

    const res = await [inst1, inst2].submit();

    assert.isTrue(res.isOk, res.unwrap());
    console.log('# mint1: ', inst1.unwrap().data);
    console.log('# mint2: ', inst2.unwrap().data);
    console.log('# signature: ', res.unwrap());
  });

  it('Transfer nft', async () => {
    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const inst1 = await Metaplex.mint(
      data,
      source.toPublicKey(),
      [source.toKeypair()],
    );

    assert.isTrue(inst1.isOk);

    const resMint = await inst1.submit();
    console.log('# mint: ', inst1.unwrap().data);
    console.log('# signature: ', resMint.unwrap());

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`)

    const inst2 = await SplToken.transferNft(
      (inst1.unwrap().data as string).toPublicKey(),
      source.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair()],
    );

    const res = await inst2.submit();
    console.log('# signature: ', res.unwrap());
  });

  it('Transfer nft with fee payer', async () => {

    const feePayer = Account.create();
    await Account.requestAirdrop(feePayer.toPublicKey());
    const beforeFeePayer = await Account.getBalance(feePayer.toPublicKey());

    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const inst1 = await Metaplex.mint(
      data,
      source.toPublicKey(),
      [source.toKeypair()],
    );

    assert.isTrue(inst1.isOk);

    const resMint = await inst1.submit();
    console.log('# mint: ', inst1.unwrap().data);
    console.log('# signature: ', resMint.unwrap());

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`)

    const beforeSource = await Account.getBalance(source.toPublicKey());

    const inst2 = await SplToken.transferNft(
      (inst1.unwrap().data as string).toPublicKey(),
      source.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair()],
      feePayer.toKeypair(),
    );

    const res = await inst2.submit();
    console.log('# signature: ', res.unwrap());

    Transaction.confirmedSig(res.unwrap());

    const afterFeePayer = await Account.getBalance(feePayer.toPublicKey());
    const afterSource = await Account.getBalance(source.toPublicKey());

    assert.isTrue(beforeFeePayer.unwrap() > afterFeePayer.unwrap());
    assert.equal(beforeSource.unwrap(), afterSource.unwrap());
  });

  it('Transfer nft with multi sig', async () => {

    // create multisig
    const signer1 = Account.create();
    const signer2 = Account.create();

    const multisig = await Multisig.create(
      2,
      source.toKeypair(),
      [
        signer1.toPublicKey(),
        signer2.toPublicKey(),
      ]
    );

    const resMulti = await multisig.submit();

    assert(resMulti.isOk, `${resMulti.unwrap()}`);

    const multisigAddress = multisig.unwrap().data as string;

    console.log('# multisig address: ', multisigAddress);


    // create nft
    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const inst1 = await Metaplex.mint(
      data,
      source.toPublicKey(),
      [source.toKeypair()],
    );

    assert.isTrue(inst1.isOk);

    const resMint = await inst1.submit();
    console.log('# mint: ', inst1.unwrap().data);
    console.log('# signature: ', resMint.unwrap());

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`)

    // transfer from source to multisig address
    const inst2 = await SplToken.transferNft(
      (inst1.unwrap().data as string).toPublicKey(),
      source.toPublicKey(),
      multisigAddress.toPublicKey(),
      [
        source.toKeypair(),
      ],
    );

    const resTransfer = await inst2.submit();
    console.log('# signature: ', resTransfer.unwrap());

    // transfer from multisig address to dest
    const inst3 = await SplToken.transferNft(
      (inst1.unwrap().data as string).toPublicKey(),
      multisigAddress.toPublicKey(),
      dest.toPublicKey(),
      [
        signer1.toKeypair(),
        signer2.toKeypair(),
      ],
      source.toKeypair(),
    );

    const res = await inst3.submit();
    console.log('# signature: ', res.unwrap());
  });
});
