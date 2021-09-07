import {describe, it} from 'mocha';
import {expect, assert} from 'chai'
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';
import {Transaction} from '../../../src/transaction';
import {MetaplexMetaData} from '../../../src/nft/metaplex/metadata';
import {MetaplexObject} from '../../../src/nft/metaplex/object';
import {MetaplexMint} from '../../../src/nft/metaplex/mint';

let owner: Wallet.Keypair;

describe('MetaplexMetaData', () => {
  before(async () => {const obj = await setupKeyPair(); owner = obj.dest;}); it('Create metadata', async () => {
    const metadata = new MetaplexObject.Data({
      name: 'Cat', 
      symbol: 'CAT', 
      uri: 'https://ipfs.io/ipfs/bafkreidhum26mmvdkkzjecvmtjy2m7pg6ywuril365b4t5qqp6jkrlse54',
      // uri: 'https://arweave.net/KYJ1UZ2X0WF9wake1YyiJXKxiek2B_lnuHtn5R1zD50',
      // uri: 'https://arweave.net/1eH7bZS-6HZH4YOc8T_tGp2Rq25dlhclXJkoa6U55mM',
      sellerFeeBasisPoints: 100,
      // creators: [new MetaplexObject.Creator(args)]
      creators: null
    });

    const txsign = await MetaplexMint.create(owner.pubkey, [owner.secret])();
    const tx = await MetaplexMetaData.create(
      metadata,
      txsign.mintKey,
      owner.pubkey,
    )(txsign.instructions);
    // todo: already signed. refactoring
    const res = await Transaction.sendInstructions(txsign.signers, tx);
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);
  });

  it('Get metadata by mintKey', async () => {
    const orgData = {
      ownerPubKey: '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U',
      mintKey: 'Hn1DMeFF9baMuGVaC5dWhKC2jaPEQnB4pdY9iqz6G4zf',
      name: 'Gropu1',
      symbol: '',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      fee: 0
    };

    const res = await MetaplexMetaData.getByMintKey(
      'Hn1DMeFF9baMuGVaC5dWhKC2jaPEQnB4pdY9iqz6G4zf'
    );
    expect(res.name).to.equal(orgData.name);
    expect(res.symbol).to.equal(orgData.symbol);
    expect(res.uri).to.equal(orgData.uri);
    expect(res.mintKey).to.equal(orgData.mintKey);
    expect(res.ownerPubKey).to.equal(orgData.ownerPubKey);
    expect(res.fee).to.equal(orgData.fee);
  });

  it('Get metadata by ownerPubKey', async () => {
    const res = await MetaplexMetaData.getByOwnerPubKey(
      '81fariKMBVi2KvbfM9XBAgTmHJJXnyCzvqsrJ3xGx5WK'
    );
    assert.isNotEmpty(res);
  });
})
