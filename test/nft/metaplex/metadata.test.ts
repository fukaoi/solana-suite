import {describe, it} from 'mocha';
import {assert} from 'chai'
import {MetaplexMetaData} from '../../../src/nft/metaplex/metadata';
import {MetaplexInstructure} from '../../../src/nft/metaplex';
import {Setup} from '../../../test/utils/setup';
import {Wallet} from '../../../src/wallet';

let source: Wallet.KeyPair;

describe('MetaplexMetaData', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
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

    const tokenKey = 'ZSMBYfbdn9eFJxs91p61nMbdZ7JALuXvUukqZu18skM'.toPubKey();
    const sourceStr = source.pubkey.toPubKey();

    const res = await MetaplexMetaData.create(
      data,
      tokenKey,
      sourceStr,
      sourceStr,
      sourceStr,
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

    const tokenKey = 'ZSMBYfbdn9eFJxs91p61nMbdZ7JALuXvUukqZu18skM'.toPubKey();

    const res = await MetaplexMetaData.update(
      data,
      undefined,
      undefined,
      tokenKey,
      source.pubkey.toPubKey(),
      [source.secret.toKeypair()],
    )();
    assert.isArray(res);
    assert.isObject(res[0]);
  });

  it('Get metadata by tokenKey', async () => {
    const orgData = {
      updateAuthority: '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U',
      name: 'Gropu1',
      symbol: '',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 0
    };

    const res = await MetaplexMetaData.getByTokenKey(
      'Hn1DMeFF9baMuGVaC5dWhKC2jaPEQnB4pdY9iqz6G4zf'.toPubKey()
    );
    assert.equal(res.name, orgData.name)
    assert.equal(res.symbol, orgData.symbol)
    assert.equal(res.uri, orgData.uri)
    assert.equal(res.update_authority, orgData.updateAuthority)
    assert.equal(res.seller_fee_basis_points, orgData.sellerFeeBasisPoints)
  });

  it('Get metadata of nft by owner', async () => {
    const res = await MetaplexMetaData.getByOwner(
      '78DybLoke46TR6RW1HWZBMYt7qouGggQJjLATsfL7RwA'.toPubKey()
    );
    assert.isNotEmpty(res);
  });
})
