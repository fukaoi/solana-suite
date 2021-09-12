import {describe, it} from 'mocha';
import {expect, assert} from 'chai'
import {MetaplexMetaData} from '../../../src/nft/metaplex/metadata';

describe('MetaplexMetaData', () => {

  it.skip('Create metadata', async () => {
    //@see metaplex/index.test.ts
  });

  it.skip('Update metadata', async () => {
    //@see metaplex/index.test.ts
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

  it('Get metadata by created pubkey', async () => {
    const res = await MetaplexMetaData.getByCreatedPubKey(
      '81fariKMBVi2KvbfM9XBAgTmHJJXnyCzvqsrJ3xGx5WK'
    );

    console.log('# dump metadata: ', res);
    assert.isNotEmpty(res);
  });
})
