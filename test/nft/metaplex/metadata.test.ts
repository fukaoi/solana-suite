import {describe, it} from 'mocha';
import {assert, expect} from 'chai'
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
      publishAddress: '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U',
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
    expect(res.publishAddress).to.equal(orgData.publishAddress);
    expect(res.fee).to.equal(orgData.fee);
  });

  it('Get metadata by dummy mintKey', async () => {
    const res = await MetaplexMetaData.getByMintKey(
      'E8yK73o1Fcpyn3hxGhaxen3pVRYixzK4Ef2PCbCpHtBN'
    );
    assert.isEmpty(res.name);
    assert.isEmpty(res.symbol);
    assert.isEmpty(res.uri);
    assert.isEmpty(res.mintKey);
    assert.isEmpty(res.publishAddress);
    assert.equal(res.fee, 0);
  });

  it('Get metadata of nft by owner', async () => {
    const res = await MetaplexMetaData.getByOwner(
      'FCdMcH77AsQsMKTq6LaLdjQQarmB4RbxDvuoi1M1i9vX'
    );
    assert.isNotEmpty(res);
  });
})
