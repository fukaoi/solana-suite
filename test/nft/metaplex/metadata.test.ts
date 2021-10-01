import {describe, it} from 'mocha';
import {assert} from 'chai'
import {MetaplexMetaData} from '../../../src/nft/metaplex/metadata';
import {MetaplexInstructure} from '../../../src/nft/metaplex';
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';

let source: Wallet.KeyPair;

describe('MetaplexMetaData', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
  });

  it('Create instructions for create metadata', async () => {
    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const mintKey = 'ZSMBYfbdn9eFJxs91p61nMbdZ7JALuXvUukqZu18skM';

    const res = await MetaplexMetaData.create(
      data,
      mintKey,
      source.pubkey,
      source.pubkey,
      source.pubkey,
    )();
    assert.isArray(res);
    assert.isObject(res[0]);
  });

  it('Create instructions for update metadata', async () => {
    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const mintKey = 'ZSMBYfbdn9eFJxs91p61nMbdZ7JALuXvUukqZu18skM';

    const res = await MetaplexMetaData.update(
      data,
      undefined,
      undefined,
      mintKey,
      source.pubkey,
      [source.secret],
    )();
    assert.isArray(res);
    assert.isObject(res[0]);
  });

  it('Get metadata by mintKey', async () => {
    const orgData = {
      updateAuthority: '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U',
      name: 'Gropu1',
      symbol: '',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 0
    };

    const res = await MetaplexMetaData.getByMintKey(
      'Hn1DMeFF9baMuGVaC5dWhKC2jaPEQnB4pdY9iqz6G4zf'
    );
    assert.equal(res.name, orgData.name)
    assert.equal(res.symbol, orgData.symbol)
    assert.equal(res.uri, orgData.uri)
    assert.equal(res.update_authority, orgData.updateAuthority)
    assert.equal(res.seller_fee_basis_points, orgData.sellerFeeBasisPoints)
  });

  it('Get metadata of nft by owner', async () => {
    const res = await MetaplexMetaData.getByOwner(
      '78DybLoke46TR6RW1HWZBMYt7qouGggQJjLATsfL7RwA'
    );
    assert.isNotEmpty(res);
  });
})
