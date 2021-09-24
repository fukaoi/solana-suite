import {describe, it} from 'mocha';
import {assert} from 'chai'
import {MetaplexMetaData} from '../../../src/nft/metaplex/metadata';
import {MetaplexObject} from '../../../src/nft/metaplex/object';
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';

let source: Wallet.Keypair;

describe('MetaplexMetaData', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
  });

  it('Create instructions for create metadata', async () => {
    const data = new MetaplexObject.Data({
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
    const data = new MetaplexObject.Data({
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

    if (!res) assert.fail('None res data');

    console.log('# metadata: ', res);
    assert.equal(res.name, orgData.name)
    assert.equal(res.symbol, orgData.symbol)
    assert.equal(res.uri, orgData.uri)
    assert.equal(res.mintKey, orgData.mintKey)
    assert.equal(res.publishAddress, orgData.publishAddress)
    assert.equal(res.fee, orgData.fee)
  });

  it('Get metadata by dummy mintKey', async () => {
    const res = await MetaplexMetaData.getByMintKey(
      'E8yK73o1Fcpyn3hxGhaxen3pVRYixzK4Ef2PCbCpHtBN'
    );

    if (!res) assert.fail('None res data');

    assert.isEmpty(res.name);
    assert.isEmpty(res.symbol);
    assert.isEmpty(res.uri);
    assert.isEmpty(res.mintKey);
    assert.isEmpty(res.publishAddress);
    assert.equal(res.fee, 0);
  });

  it('Get metadata of nft by owner', async () => {
    const res = await MetaplexMetaData.getByOwner(
      '78DybLoke46TR6RW1HWZBMYt7qouGggQJjLATsfL7RwA'
    );
    console.log('# metadata: ', res);
    assert.isNotEmpty(res);
  });
})
