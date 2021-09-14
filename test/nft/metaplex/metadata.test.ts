import {describe, it} from 'mocha';
import {assert} from 'chai'
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
      // 'Hn1DMeFF9baMuGVaC5dWhKC2jaPEQnB4pdY9iqz6G4zf'
      'Qm6t82zFQZmv1WFPFdC51MN3mBgs8cSZtDLpEYSh686'
    );

    console.log(res);
    // expect(res.name).to.equal(orgData.name);
    // expect(res.symbol).to.equal(orgData.symbol);
    // expect(res.uri).to.equal(orgData.uri);
    // expect(res.mintKey).to.equal(orgData.mintKey);
    // expect(res.ownerPubKey).to.equal(orgData.ownerPubKey);
    // expect(res.fee).to.equal(orgData.fee);
  });

  it.only('Get metadata of nft by owner', async () => {
    const res = await MetaplexMetaData.getByOwner(
      'FCdMcH77AsQsMKTq6LaLdjQQarmB4RbxDvuoi1M1i9vX'
    );
    console.log('# dump metadata: ', res);
    assert.isNotEmpty(res);
  });
})
